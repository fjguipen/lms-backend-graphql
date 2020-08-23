import { LessonModel, CompletedLessonModel } from '../model';
import { UserModel } from '../../user/model';
import { ApolloError } from 'apollo-server-core';
import { ContentModel } from '../../content/model';

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

export async function checkContentRequirements(
  user: UserModel,
  content: ContentModel
): Promise<void> {
  const prevContent = await ContentModel.query()
    .modify('sort', 'DESC')
    .where('order_position', '<', content.order_position)
    .first();

  if (prevContent) {
    // CHeck if prevContent is completed
    if (prevContent.type === 'quizz') {
      // Check if there is succeeded evaluation for this quizz
    } else if (prevContent.type === 'text') {
      /// Check if prevContent had been viewed by this student
    }
  }
}
