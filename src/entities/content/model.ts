import { Model, QueryBuilder, OrderByDirection } from 'objection';
import { Content, FormattedText, Quizz } from '../../_generated/types';

export class FormattedTextModel extends Model implements FormattedText {
  static tableName = 'formatted_texts'
  id: number

  static get relationMappings() {
    return {
      content: {
        relation: Model.BelongsToOneRelation,
        modelClass: ContentModel as any,
        join: {
          from: `${FormattedTextModel.tableName}.id`,
          to: `${ContentModel.tableName}.id`
        }
      }
    }
  }
}

export class QuizzModel extends Model implements Quizz {
  static tableName = 'quizzes'
  id: number


  static get relationMappings() {
    const { QuestionModel } = require('../models')
    return {
      content: {
        relation: Model.BelongsToOneRelation,
        modelClass: ContentModel as any,
        join: {
          from: `${QuizzModel.tableName}.id`,
          to: `${ContentModel.tableName}.id`
        }
      },
      questions: {
        relation: Model.HasManyRelation,
        modelClass: QuestionModel as any,
        join: {
          from: `${QuizzModel.tableName}.id`,
          to: `${QuestionModel.tableName}.quizz_id`
        }
      },
    }
  }
}

export class ContentModel extends Model implements Content{
  static tableName = 'contents'
  id: number
  type: string
  lesson_id: number
  order_position: number

  static get modifiers() {
    return {
      sort(builder: QueryBuilder<Model>, direction: OrderByDirection = 'ASC'){
        builder.orderBy('order_position', direction)
      }
    }
  }

  static get relationMappings() {
    const { LessonModel } = require('../models')
    
    return {
      lesson: {
        relation: Model.BelongsToOneRelation,
        modelClass: LessonModel,
        join: {
          from: `${ContentModel.tableName}.lesson_id`,
          to: `${LessonModel.tableName}.id`
        }
      },
      text: {
        relation: Model.HasOneRelation,
        modelClass: FormattedTextModel as any,
        join: {
          from: `${ContentModel.tableName}.id`,
          to: `${FormattedTextModel.tableName}.id`
        }
      },
      quizz: {
        relation: Model.HasOneRelation,
        modelClass: QuizzModel as any,
        join: {
          from: `${ContentModel.tableName}.id`,
          to: `${QuizzModel.tableName}.id`
        }
      },
    };
  }
}