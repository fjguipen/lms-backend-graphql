import {
  Evaluation,
  Answer,
  Quizz,
  EvaluationAuthor,
} from '../../../_generated/types';
import { AnswerModel } from '../../answer/model';
import { QuizzModel } from '../../content/model';
import { UserModel } from '../../user/model';

export async function resolveAnswers(
  evaluation: Evaluation
): Promise<Answer[]> {
  return AnswerModel.query().where('evaluation_id', evaluation.id);
}

export async function resolveQuizz(
  evaluation: Evaluation
): Promise<QuizzModel> {
  return QuizzModel.query().findById(evaluation.quizz_id);
}

export async function resolveAuthor(
  evaluation: Evaluation
): Promise<EvaluationAuthor> {
  return UserModel.query().findById(evaluation.user_id);
}
