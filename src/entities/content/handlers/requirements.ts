import { UserModel } from '../../user/model';
import { ContentModel } from '../model';
import { EvaluationModel } from '../../evaluation/model';

export async function checkContentsRequirements(
  user: UserModel,
  contents: ContentModel[]
): Promise<ContentModel[]> {
  const lessonQuizzes = contents.filter(
    (c) => c.type === ContentModel.types.quizz
  );

  if (lessonQuizzes.length === 0) {
    return contents;
  }

  const filteredContents: ContentModel[] = [];
  const succeededEvaluations = await EvaluationModel.query()
    .joinRelated('quizz.content')
    .where('user_id', user.id)
    .where('success', true)
    .where(
      'quizz_id',
      'in',
      lessonQuizzes.map((c) => c.id)
    )
    .orderBy('quizz:content.order_position', 'DESC');

  for (let i = 0; i < contents.length; i++) {
    const content = contents[i];
    filteredContents.push(content);
    if (
      content.type === ContentModel.types.quizz &&
      !succeededEvaluations.find((e) => e.quizz_id === content.id)
    ) {
      break;
    }
  }

  return filteredContents;
}
