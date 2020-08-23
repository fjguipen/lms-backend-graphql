import { Model } from 'objection';
import { Content, FormattedText, Quizz, QueryContentArgs, MutationCreateContentArgs, MutationUpdateContentArgs, QueryContentsArgs, MutationDeleteContentArgs } from '../../_generated/types';
import { sortByOrderPosition } from '../commons';
import { ResolversContext } from '../../types';

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
      sort: sortByOrderPosition
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

  static async create(_, { input }: MutationCreateContentArgs, { session }: ResolversContext){
    const content = await ContentModel.query().insert(input).returning('*')
    return content
  }

  static async update(_, { input }: MutationUpdateContentArgs, { session }: ResolversContext){
    const content = await ContentModel.query().patch(input).where('id', input.id)
    return content
  }

  static async delete(_, { ids }: MutationDeleteContentArgs, { session }: ResolversContext){
    const content = await ContentModel.query().delete().where('id', 'in', ids)
    return content
  }

  static async getOne(_, { id }: QueryContentArgs): Promise<Content> {
    return await ContentModel.query().findById(id)
  }

  static async getMany(_, { input }: QueryContentsArgs): Promise<Content[]> {
    return ContentModel.query()
      .modify( query => {
        for (let key of Object.keys(input)){
          query.where(key, input[key])
        }
      })
  }
}