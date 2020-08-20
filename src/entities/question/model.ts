import { Model } from 'objection';
import { Question } from '../../_generated/types';

export class QuestionModel extends Model implements Question {
  static tableName = 'questions'
  id: number
  type: string

  static get relationMappings() {
    const { QuizzModel } = require('../models')
    return {
      quizz: {
        relation: Model.BelongsToOneRelation,
        modelClass: QuizzModel,
        join: {
          from: `${QuestionModel.tableName}.quizz_id`,
          to: `${QuizzModel.tableName}.id`
        }
      }
    };
  }
}