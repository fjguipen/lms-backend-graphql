import {
  UpdateContentInput,
  CreateContentInput,
} from '../../../_generated/types';
import { QuizzModel, ContentModel } from '../model';
import { QuestionModel } from '../../question/model';

export function loadQuizzGraphData(input: CreateContentInput, graph) {
  QuizzModel.validateQuestionsInput(input.questions);

  graph['quizz'] = {
    questions: input.questions,
  };
}

export async function handleUpdateQuizz(
  content: ContentModel,
  input: UpdateContentInput
) {
  QuizzModel.validateQuestionsInput(input.questions);
  await QuizzModel.transaction(async (trx) => {
    const quizz = await QuizzModel.query(trx).findById(content.id);
    await quizz.$relatedQuery('questions', trx).unrelate();
    await quizz
      .$relatedQuery('questions', trx)
      .insertGraph(input.questions as QuestionModel[]);
  });
}
