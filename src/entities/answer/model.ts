import { Model } from 'objection';
import { Answer } from '../../_generated/types';

export class AnswerModel extends Model implements Answer {
  static tableName = 'answers';
  id: number;
  question_id: number;
  evaluation_id: number;
  value: string;

  static get relationMappings() {
    const { QuestionModel } = require('../models');
    const { EvaluationModel } = require('../models');

    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: QuestionModel,
        join: {
          from: `${AnswerModel.tableName}.question_id`,
          to: `${QuestionModel.tableName}.id`,
        },
      },
      evaluation: {
        relation: Model.BelongsToOneRelation,
        modelClass: EvaluationModel,
        join: {
          from: `${AnswerModel.tableName}.evaluation_id`,
          to: `${EvaluationModel.tableName}.id`,
        },
      },
    };
  }
}
