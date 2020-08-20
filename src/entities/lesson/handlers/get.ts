import { Lesson, QueryLessonsArgs } from "../../../_generated/types";
import { LessonModel } from "../model";

export async function getLesson(_, { id }): Promise<Lesson> {
  return await LessonModel.query().findById(id)
}

export async function getLessons(_, { input }: QueryLessonsArgs): Promise<Lesson[]> {
  return LessonModel.query()
    .modify( query => {
      for (let key of Object.keys(input)){
        query.where(key, input[key])
      }
    });
}