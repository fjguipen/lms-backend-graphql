import {
  resolveQuizzQuestions,
  resolveFormattedTextValue,
} from './handlers/resolve';
import { authorize } from '../../auth';
import { ROLES } from '../../auth/types';
import { ContentModel } from './model';

export default {
  Query: {
    content: authorize(ContentModel.getOne, [ROLES.PROFESSOR]),
    contents: authorize(ContentModel.getMany, [ROLES.PROFESSOR]),
  },
  Mutation: {
    createContent: authorize(ContentModel.create, [ROLES.PROFESSOR]),
    updateContent: authorize(ContentModel.update, [ROLES.PROFESSOR]),
    deleteContent: authorize(ContentModel.delete, [ROLES.PROFESSOR]),
    setViewedContent: ContentModel.setViewedContent,
  },
  Content: {
    __resolveType: (source) => {
      if (source.type === ContentModel.types.formattedText) {
        return 'FormattedText';
      } else if (source.type === ContentModel.types.quizz) {
        return 'Quizz';
      }
    },
  },
  Quizz: {
    questions: resolveQuizzQuestions,
  },
  FormattedText: {
    value: resolveFormattedTextValue,
  },
};
