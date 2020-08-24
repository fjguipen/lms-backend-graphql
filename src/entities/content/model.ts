import { Model, transaction } from 'objection';
import {
  Content,
  FormattedText,
  Quizz,
  QueryContentArgs,
  MutationCreateContentArgs,
  MutationUpdateContentArgs,
  QueryContentsArgs,
  MutationDeleteContentArgs,
} from '../../_generated/types';
import { sortByOrderPosition } from '../commons';
import { ApolloError } from 'apollo-server-core';

export class FormattedTextModel extends Model {
  static tableName = 'formatted_texts';
  id: number;
  value: string;

  static get relationMappings() {
    return {
      content: {
        relation: Model.BelongsToOneRelation,
        modelClass: ContentModel as any,
        join: {
          from: `${FormattedTextModel.tableName}.id`,
          to: `${ContentModel.tableName}.id`,
        },
      },
    };
  }
}

export class QuizzModel extends Model {
  static tableName = 'quizzes';
  id: number;

  static get relationMappings() {
    const { QuestionModel } = require('../models');
    return {
      content: {
        relation: Model.BelongsToOneRelation,
        modelClass: ContentModel as any,
        join: {
          from: `${QuizzModel.tableName}.id`,
          to: `${ContentModel.tableName}.id`,
        },
      },
      questions: {
        relation: Model.HasManyRelation,
        modelClass: QuestionModel as any,
        join: {
          from: `${QuizzModel.tableName}.id`,
          to: `${QuestionModel.tableName}.quizz_id`,
        },
      },
    };
  }
}

export class ContentModel extends Model implements Content {
  static tableName = 'contents';
  id: number;
  type: string;
  lesson_id: number;
  order_position: number;

  // static get virtualAttributes(){
  //   return ['']
  // }

  static get modifiers() {
    return {
      sort: sortByOrderPosition,
    };
  }

  static get relationMappings() {
    const { LessonModel } = require('../models');

    return {
      lesson: {
        relation: Model.BelongsToOneRelation,
        modelClass: LessonModel,
        join: {
          from: `${ContentModel.tableName}.lesson_id`,
          to: `${LessonModel.tableName}.id`,
        },
      },
      text: {
        relation: Model.HasOneRelation,
        modelClass: FormattedTextModel as any,
        join: {
          from: `${ContentModel.tableName}.id`,
          to: `${FormattedTextModel.tableName}.id`,
        },
      },
      quizz: {
        relation: Model.HasOneRelation,
        modelClass: QuizzModel as any,
        join: {
          from: `${ContentModel.tableName}.id`,
          to: `${QuizzModel.tableName}.id`,
        },
      },
    };
  }
  // TODO: sanitize & validations
  static async create(_, { input }: MutationCreateContentArgs) {
    const result = await ContentModel.transaction(async (trx) => {
      const content = await ContentModel.query(trx)
        .insert(input)
        .returning('*');

      if (content.type === 'formatted_text') {
        content.$relatedQuery('text', trx).insert({
          id: content.id,
          text: input.text,
        } as any);
      } else if (content.type === 'quizz') {
        //
      } else {
        throw new ApolloError('Invalid content type');
      }
      return content;
    });

    return result;
  }

  static async update(_, { input }: MutationUpdateContentArgs) {
    const content = await ContentModel.query()
      .patch(input)
      .where('id', input.id);
    return content;
  }

  static async delete(
    _,
    { ids }: MutationDeleteContentArgs
  ): Promise<Content[]> {
    const result = await ContentModel.query()
      .delete()
      .where('id', 'in', ids)
      .returning('*');

    return result;
  }

  static async getOne(_, { id }: QueryContentArgs): Promise<Content> {
    return ContentModel.query().findById(id);
  }

  static async getMany(_, { input }: QueryContentsArgs): Promise<Content[]> {
    return ContentModel.query().modify((query) => {
      for (let key of Object.keys(input)) {
        query.where(key, input[key]);
      }
    });
  }
}
