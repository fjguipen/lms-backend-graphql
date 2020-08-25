import { LessonModel, CompletedLessonModel } from '../model';
import { UserModel } from '../../user/model';
import { ApolloError } from 'apollo-server-core';
import { ContentModel } from '../../content/model';
import { EvaluationModel } from '../../evaluation/model';

export async function checkLessonRequirements(
  user: UserModel,
  lesson: LessonModel
): Promise<void> {
  const prevLesson = await LessonModel.query()
    .where('level_id', lesson.level_id)
    .where('order_position', '<', lesson.order_position)
    .modify('sort', 'DESC')
    .first();

  if (prevLesson) {
    // Check if last content of prevLesson is completed
    const completed = await CompletedLessonModel.query()
      .where('lesson_id', prevLesson.id)
      .where('user_id', user.id)
      .first();

    if (!completed) {
      throw new ApolloError(
        `Requirements to see this lesson not met. Please complete ${prevLesson.title} lesson first.`
      );
    }
  }
}

export async function filterLessonsByRequirements(
  user: UserModel,
  lessons: LessonModel[]
): Promise<LessonModel[]> {
  const filteredLessons = [];
  for (const lesson of lessons) {
    try {
      await checkLessonRequirements(user, lesson);
      filteredLessons.push(lesson);
    } catch (err) {
      // pass
      filteredLessons.push(null);
    }
  }

  return filteredLessons;
}

export async function checkLessonContentsRequirements(
  user: UserModel,
  contents: ContentModel[]
): Promise<ContentModel[]> {
  const lessonQuizzes = contents.filter(
    (c) => c.type === ContentModel.types.quizz
  );

  if (lessonQuizzes.length === 0) {
    return contents;
  }

  const filteredContents: ContentModel[] = [];
  const succeededEvaluations = await EvaluationModel.query()
    .joinRelated('quizz.content')
    .where('user_id', user.id)
    .where('success', true)
    .where(
      'quizz_id',
      'in',
      lessonQuizzes.map((c) => c.id)
    )
    .orderBy('quizz:content.order_position', 'DESC');

  for (let i = 0; i < contents.length; i++) {
    const content = contents[i];
    filteredContents.push(content);
    if (
      content.type === ContentModel.types.quizz &&
      !succeededEvaluations.find((e) => e.quizz_id === content.id)
    ) {
      break;
    }
  }

  return filteredContents;
}
