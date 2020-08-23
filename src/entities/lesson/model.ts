import { Model } from 'objection';
import { Lesson } from '../../_generated/types';
import { sortByOrderPosition } from '../commons';

export class LessonModel extends Model implements Lesson {
  static tableName = 'lessons'
  id: number
  level_id: number
  title: string
  description: string
  order_position: number

  static get modifiers() {
    return {
      sort: sortByOrderPosition
    }
  }

  static get relationMappings() {
    const { LevelModel } = require('../models')
    return {
      level: {
        relation: Model.BelongsToOneRelation,
        modelClass: LevelModel,
        join: {
          from: `${LessonModel.tableName}.level_id`,
          to: `${LevelModel.tableName}.id`
        }
      },
      completed_lessons: {
        relation: Model.HasManyRelation,
        modelClass: CompletedLessonModel as any,
        join: {
          from: `${LessonModel.tableName}.id`,
          to: `${CompletedLessonModel.tableName}.lesson_id`
        }
      }
    };
  }
}

export class CompletedLessonModel extends Model {
  static tableName = 'completed_lessons'
  static idColumn = ['user_id', 'lesson_id']
  id: number
  user_id: number
  lesson_id: number

  static get relationMappings() {
    const { UserModel } = require('../models')
    return {
      lesson: {
        relation: Model.BelongsToOneRelation,
        modelClass: LessonModel as any,
        join: {
          from: `${CompletedLessonModel.tableName}.lesson_id`,
          to: `${LessonModel.tableName}.id`
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${CompletedLessonModel.tableName}.user_id`,
          to: `${UserModel.tableName}.id`
        }
      }
    };
  }
}