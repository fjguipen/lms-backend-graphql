import { Model } from 'objection';
import {
  Lesson,
  QueryLessonArgs,
  QueryLessonsArgs,
} from '../../_generated/types';
import { sortByOrderPosition } from '../commons';
import { ResolversContext } from '../../types';
import { UserModel } from '../user/model';
import {
  checkLessonRequirements,
  filterLessonsByRequirements,
} from './handlers/requirements';

export class LessonModel extends Model implements Lesson {
  static tableName = 'lessons';
  id: number;
  level_id: number;
  title: string;
  description: string;
  order_position: number;

  static get modifiers() {
    return {
      sort: sortByOrderPosition,
    };
  }

  static get relationMappings() {
    const { LevelModel } = require('../models');
    return {
      level: {
        relation: Model.BelongsToOneRelation,
        modelClass: LevelModel,
        join: {
          from: `${LessonModel.tableName}.level_id`,
          to: `${LevelModel.tableName}.id`,
        },
      },
      completed_lessons: {
        relation: Model.HasManyRelation,
        modelClass: CompletedLessonModel as any,
        join: {
          from: `${LessonModel.tableName}.id`,
          to: `${CompletedLessonModel.tableName}.lesson_id`,
        },
      },
    };
  }

  static async get(
    _,
    { id }: QueryLessonArgs,
    { session }: ResolversContext
  ): Promise<Lesson> {
    const user = await UserModel.query().findById(session.user.id);
    const lesson = await LessonModel.query().findById(id);
    if (!['adm', 'prf'].some((rol) => user.rol.includes(rol))) {
      await checkLessonRequirements(user, lesson);
    }

    return lesson;
  }

  static async getMany(
    _,
    { input = {} }: QueryLessonsArgs,
    { session }: ResolversContext
  ): Promise<Lesson[]> {
    const user = await UserModel.query().findById(session.user.id);

    const lessons = await LessonModel.query()
      .modify('sort')
      .modify((query) => {
        for (let key of Object.keys(input)) {
          query.where(key, input[key]);
        }
      });

    if (!['adm', 'prf'].some((rol) => user.rol.includes(rol))) {
      return await filterLessonsByRequirements(user, lessons);
    }

    return lessons;
  }

  static async markAsCompleted(lessonId: number, userId: number) {
    await CompletedLessonModel.query().insert({
      user_id: userId,
      lesson_id: lessonId,
    });
  }
}

export class CompletedLessonModel extends Model {
  static tableName = 'completed_lessons';
  static idColumn = ['user_id', 'lesson_id'];
  id: number;
  user_id: number;
  lesson_id: number;

  static get relationMappings() {
    const { UserModel } = require('../models');
    return {
      lesson: {
        relation: Model.BelongsToOneRelation,
        modelClass: LessonModel as any,
        join: {
          from: `${CompletedLessonModel.tableName}.lesson_id`,
          to: `${LessonModel.tableName}.id`,
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${CompletedLessonModel.tableName}.user_id`,
          to: `${UserModel.tableName}.id`,
        },
      },
    };
  }
}
