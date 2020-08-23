import { Model } from 'objection';
import { Question, QuestionOption } from '../../_generated/types';
import { sortByOrderPosition } from '../commons';

export class QuestionModel extends Model implements Question {
  static tableName = 'questions'
  id: number
  type: string

  static get modifiers() {
    return {
      sort: sortByOrderPosition
    }
  }

  static get relationMappings() {
    const { QuizzModel } = require('../models')
    const { AnswerModel } = require('../models')

    return {
      quizz: {
        relation: Model.BelongsToOneRelation,
        modelClass: QuizzModel,
        join: {
          from: `${QuestionModel.tableName}.quizz_id`,
          to: `${QuizzModel.tableName}.id`
        }
      },
      options: {
        relation: Model.HasManyRelation,
        modelClass: QuestionOptionModel as any,
        join: {
          from: `${QuestionModel.tableName}.id`,
          to: `${QuestionOptionModel.tableName}.question_id`
        }
      },
      answers: {
        relation: Model.HasManyRelation,
        modelClass: AnswerModel,
        join: {
          from: `${QuestionModel.tableName}.id`,
          to: `${AnswerModel.tableName}.evaluation_id`
        }
      },
    };
  }
}

export class QuestionOptionModel extends Model implements QuestionOption {
  static tableName = 'options'
  id: number

  static get relationMappings() {
    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: QuestionModel as any,
        join: {
          from: `${QuestionOptionModel.tableName}.question_id`,
          to: `${QuestionModel.tableName}.id`
        }
      }
    };
  }  
}