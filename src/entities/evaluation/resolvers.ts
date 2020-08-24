import {
  resolveAnswers,
  resolveQuizz,
  resolveAuthor,
} from './handlers/resolve';
import { authorize } from '../../auth';
import { EvaluationModel } from './model';
import { ROLES } from '../../auth/types';

export default {
  Query: {
    evaluation: authorize(EvaluationModel.get, [ROLES.PROFESSOR]),
    evaluations: authorize(EvaluationModel.getMany, [ROLES.PROFESSOR]),
  },
  Mutation: {
    evaluateQuizz: authorize(EvaluationModel.evaluateQuizz, [ROLES.STUDENT]),
  },
  Evaluation: {
    answers: resolveAnswers,
    quizz: resolveQuizz,
    author: resolveAuthor,
  },
};
