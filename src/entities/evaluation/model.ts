import { Model } from 'objection';
import { Evaluation } from '../../_generated/types';

export class EvaluationModel extends Model implements Evaluation {
  static tableName = 'evaluations'
  id: number
  user_id: number
  quizz_id: number
  mark: number
  success: boolean
  created: string

  static get relationMappings() {
    const { QuizzModel } = require('../models')
    const { UserModel } = require('../models')
    const { AnswerModel } = require('../models')

    return {
      quizz: {
        relation: Model.BelongsToOneRelation,
        modelClass: QuizzModel,
        join: {
          from: `${EvaluationModel.tableName}.quizz_id`,
          to: `${QuizzModel.tableName}.id`
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${EvaluationModel.tableName}.user_id`,
          to: `${UserModel.tableName}.id`
        }
      },
      answers: {
        relation: Model.HasManyRelation,
        modelClass: AnswerModel,
        join: {
          from: `${EvaluationModel.tableName}.id`,
          to: `${AnswerModel.tableName}.evaluation_id`
        }
      },
    };
  }
}