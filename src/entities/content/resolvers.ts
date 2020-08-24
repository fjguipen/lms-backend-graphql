import {
  resolveQuizz,
  resolveQuestions,
  resolveFormattedTextValue,
} from './handlers/resolve';
import { authorize } from '../../auth';
import { ROLES } from '../../auth/types';
import { ContentModel } from './model';
import { Content } from '../../_generated/types';

export default {
  Query: {
    content: authorize(ContentModel.getOne, [ROLES.PROFESSOR]),
    contents: authorize(ContentModel.getMany, [ROLES.PROFESSOR]),
  },
  Mutation: {
    createContent: authorize(ContentModel.create, [ROLES.PROFESSOR]),
    updateContent: authorize(ContentModel.update, [ROLES.PROFESSOR]),
    deleteContent: authorize(ContentModel.delete, [ROLES.PROFESSOR]),
  },
  Content: {
    // quizz: resolveQuizz,
    // text: resolveFormattedText,
    __resolveType: (source) => {
      if (source.type === 'formatted_text') {
        return 'FormattedText';
      } else if (source.type === 'quizz') {
        return 'Quizz';
      }
    },
  },
  Quizz: {
    questions: resolveQuestions,
  },
  FormattedText: {
    value: resolveFormattedTextValue,
  },
};
