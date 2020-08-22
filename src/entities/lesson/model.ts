import { Model, QueryBuilder } from 'objection';
import { Lesson } from '../../_generated/types';

export class LessonModel extends Model implements Lesson {
  static tableName = 'lessons'
  id: number
  level_id: number
  title: string
  description: string
  order_position: number

  static get modifiers() {
    return {
      sort(builder: QueryBuilder<Model>){
        builder.orderBy('order_position')
      }
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
}