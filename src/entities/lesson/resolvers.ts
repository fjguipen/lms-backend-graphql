import { resolveContents } from './handlers/resolve';
import { authorize } from '../../auth';
import { ROLES } from '../../auth/types';
import { LessonModel } from './model';

export default {
  Query: {
    lesson: authorize(LessonModel.get, [ROLES.ANY]),
    lessons: authorize(LessonModel.getMany, [ROLES.ANY]),
  },
  Lesson: {
    contents: resolveContents,
  },
  Mutation: {
    createLesson: authorize(LessonModel.createLesson, [ROLES.PROFESSOR]),
    updateLesson: authorize(LessonModel.updateLesson, [ROLES.PROFESSOR]),
    deleteLesson: authorize(LessonModel.deleteLesson, [ROLES.PROFESSOR]),
  },
};
