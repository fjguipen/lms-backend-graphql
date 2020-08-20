import { Model } from 'objection';
import { Lesson } from '../../_generated/types';

export class LessonModel extends Model implements Lesson {
  static tableName = 'lessons'
  id: number

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