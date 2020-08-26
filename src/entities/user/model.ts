import { Model } from 'objection';
import {
  BaseUser,
  MutationCreateUserArgs,
  QueryUserArgs,
  User,
} from '../../_generated/types';

export class UserModel extends Model implements BaseUser {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  rol: string[];

  static tableName = 'users';

  static get relationMappings() {
    const { CompletedLessonModel } = require('../models');
    const { EvaluationModel } = require('../models');
    return {
      completed_lessons: {
        relation: Model.HasManyRelation,
        modelClass: CompletedLessonModel,
        join: {
          from: `${UserModel.tableName}.id`,
          to: `${CompletedLessonModel.tableName}.user_id`,
        },
      },
      evaluations: {
        relation: Model.HasManyRelation,
        modelClass: EvaluationModel,
        join: {
          from: `${UserModel.tableName}.id`,
          to: `${EvaluationModel.tableName}.user_id`,
        },
      },
    };
  }

  static async get(_, { id }: QueryUserArgs): Promise<User> {
    const user = await UserModel.query().where('id', id).first();

    return user;
  }

  // TODO: validations
  static async create(_, { input }: MutationCreateUserArgs): Promise<User> {
    const user = await UserModel.query().insert(input).returning('*');

    return user;
  }
}

export class UserContentView extends Model {
  static tableName = 'content_views';
  id: number;
  user_id: number;
  content_id: number;
  created: string;

  static get relationMappings() {
    const { ContentModel } = require('../models');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${UserContentView.tableName}.user_id`,
          to: `${UserModel.tableName}.id`,
        },
      },
      content: {
        relation: Model.BelongsToOneRelation,
        modelClass: ContentModel,
        join: {
          from: `${UserContentView.tableName}.content_id`,
          to: `${ContentModel.tableName}.id`,
        },
      },
    };
  }
}
