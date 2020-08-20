import { Model } from 'objection'
import { Level } from '../../_generated/types';

export class LevelModel extends Model implements Level {
  static tableName = 'levels'
  id: number
  
  static get relationMappings() {
    const { LessonModel } = require('../models')
    return {
      lessons: {
        relation: Model.HasManyRelation,
        modelClass: LessonModel,
        join: {
          from: `${LevelModel.tableName}.id`,
          to: `${LessonModel.tableName}.level_id`
        }
      }
    };
  }
}