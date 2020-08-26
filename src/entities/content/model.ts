import { Model } from 'objection';
import {
  Content,
  QueryContentArgs,
  MutationCreateContentArgs,
  MutationUpdateContentArgs,
  QueryContentsArgs,
  MutationDeleteContentArgs,
  CreateQuestionInput,
  UpdateQuestionInput,
  MutationSetViewedContentArgs,
} from '../../_generated/types';
import { sortByOrderPosition } from '../commons';
import { ApolloError } from 'apollo-server-core';
import { loadQuizzGraphData, handleUpdateQuizz } from './handlers/quizz';
import {
  loadFormattedTextData,
  handleUpdateFormattedText,
} from './handlers/formattedText';
import { ResolversContext } from '../../types';
import { UserModel, UserContentView } from '../user/model';

export class ContentModel extends Model implements Content {
  static tableName = 'contents';
  id: number;
  type: string;
  lesson_id: number;
  order_position: number;

  static get modifiers() {
    return {
      sort: sortByOrderPosition,
    };
  }

  static types = {
    formattedText: 'formatted_text',
    quizz: 'quizz',
  };

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
  // Inserts new content at the end of the lesson's content list
  static async create(_, { input }: MutationCreateContentArgs) {
    const result = await ContentModel.transaction(async (trx) => {
      const { order_position: lastIndex } = (await ContentModel.query(trx)
        .where('lesson_id', input.lesson_id)
        .modify('sort', 'DESC')
        .first()) || { order_position: null };

      let graph = {
        type: input.type,
        lesson_id: input.lesson_id,
        order_position: (lastIndex !== null && lastIndex + 1) || 0,
      };

      if (input.type === ContentModel.types.formattedText) {
        loadFormattedTextData(input, graph);
      } else if (input.type === ContentModel.types.quizz) {
        loadQuizzGraphData(input, graph);
      }
      try {
        const content = await ContentModel.query(trx).insertGraph(graph);
        return content;
      } catch (err) {
        if (err.message.includes('#dbError:')) {
          throw new ApolloError(err.message.split('#dbError:')[1]);
        } else {
          throw new ApolloError(err.message);
        }
      }
    });

    return result;
  }

  static async update(_, { input }: MutationUpdateContentArgs) {
    let content = await ContentModel.query().findById(input.id);
    if (!content) {
      throw new ApolloError('Content not found');
    }

    if (content.type === ContentModel.types.formattedText) {
      await handleUpdateFormattedText(content, input);
    } else if (content.type === ContentModel.types.quizz) {
      await handleUpdateQuizz(content, input);
    }

    return content;
  }

  static async delete(
    _,
    { ids }: MutationDeleteContentArgs
  ): Promise<number[]> {
    const result = await ContentModel.query()
      .delete()
      .where('id', 'in', ids)
      .returning('id');

    return result.map((c) => c.id);
  }

  static async getOne(
    _,
    { id }: QueryContentArgs,
    { session }: ResolversContext
  ): Promise<Content> {
    return ContentModel.query().findById(id);
  }

  static async setViewedContent(
    _,
    { input }: MutationSetViewedContentArgs,
    { session }: ResolversContext
  ) {
    try {
      await UserContentView.query().insert({
        user_id: session.user.id,
        content_id: input.content_id,
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  static async getMany(_, { input }: QueryContentsArgs): Promise<Content[]> {
    return ContentModel.query().modify((query) => {
      for (let key of Object.keys(input)) {
        query.where(key, input[key]);
      }
    });
  }
}

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

  static validateQuestionsInput(
    questions: CreateQuestionInput[] | UpdateQuestionInput[]
  ) {
    if (questions.length === 0) {
      throw new ApolloError('Invalid data: Missing quizz questions');
    }

    questions.forEach((q) => {
      if (
        !q.text ||
        (q.type !== 'open' && (!q.options || q.options.length === 0))
      ) {
        throw new ApolloError('Invalid data: Missing quizz question options');
      }
    });
  }
}
