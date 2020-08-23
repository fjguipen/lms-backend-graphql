import { Evaluation, Answer } from '../../../_generated/types';
import { AnswerModel } from '../../answer/model';

export async function resolveAnswers(
  evaluation: Evaluation
): Promise<Answer[]> {
  return AnswerModel.query().where('evaluation_id', evaluation.id);
}
