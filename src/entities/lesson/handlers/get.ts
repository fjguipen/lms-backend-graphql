import { Lesson, QueryLessonsArgs } from "../../../_generated/types";
import { LessonModel, CompletedLessonModel } from "../model";
import { ResolversContext } from "../../../types";
import { UserModel } from "../../user/model";
import { QuizzModel, ContentModel } from "../../content/model";
import { EvaluationModel } from "../../evaluation/model";
import { ApolloError } from "apollo-server-core";

async function checkLessonRequirements(user: UserModel, lesson: LessonModel){
  const prevLesson = await LessonModel.query()
    .where('level_id', lesson.level_id)
    .where('order_position', '<', lesson.order_position)
    .first()

  if (prevLesson){
    // Check if last content of prevLesson is completed
    const completed = await CompletedLessonModel.query()
      .where('lesson_id', prevLesson.id)
      .where('user_id', user.id)
      .first()

    if (!completed){
      throw new ApolloError(
        `Requirements to see this lesson not met. Please complete ${prevLesson.title} lesson first.`)
    }
  }
}

export async function getLesson(_, { id }, { session }: ResolversContext ): Promise<Lesson> {
  const user = await UserModel.query()
    .findById(session.user.id)
  const lesson = await LessonModel.query()
    .findById(id)
  if (!user.rol.includes('prf')){
    await checkLessonRequirements(user, lesson)
  }

  return lesson
}

export async function getLessons(_, { input }: QueryLessonsArgs): Promise<Lesson[]> {
  const lessons = await LessonModel.query()
    .modify('sort')
    .modify( query => {
      for (let key of Object.keys(input)){
        query.where(key, input[key])
      }
    }
  );

  return lessons

}