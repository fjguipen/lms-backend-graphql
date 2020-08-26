import { User } from '../../../_generated/types';
import { EvaluationModel } from '../../evaluation/model';
import { UserContentView } from '../model';

export function resolveEvaluations(user: User) {
  return EvaluationModel.query().where('user_id', user.id);
}

export async function resolveViewedContents(user: User) {
  const viewedContents = await UserContentView.query().where(
    'user_id',
    user.id
  );

  return viewedContents.map((c) => c.id);
}
