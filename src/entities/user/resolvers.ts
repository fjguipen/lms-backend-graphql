import { logIn, logOut, authorize } from '../../auth';
import { ROLES } from '../../auth/types';
import { resolveEvaluations, resolveViewedContents } from './handlers/resolve';
import { UserModel } from './model';

export default {
  Query: {
    user: authorize(UserModel.get, [ROLES.ADMIN, ROLES.PROFESSOR]),
  },
  User: {
    __resolveType: (source) => {
      if (source.rol.includes('prf')) {
        return 'Professor';
      } else {
        return 'Student';
      }
    },
  },
  Student: {
    password: () => {
      return null;
    },
    evaluations: resolveEvaluations,
    viewedContents: resolveViewedContents,
  },
  Professor: {
    password: () => {
      return null;
    },
  },
  Mutation: {
    login: logIn,
    logout: logOut,
    createUser: authorize(UserModel.create, [ROLES.ADMIN]),
  },
};
