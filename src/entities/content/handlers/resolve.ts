import { Content, Quizz } from '../../../_generated/types';
import { FormattedTextModel } from '../model';
import { QuestionModel } from '../../question/model';

export async function resolveFormattedTextValue(content: Content) {
  const formattedText = await FormattedTextModel.query().findById(content.id);
  return formattedText.value;
}

export async function resolveQuizzQuestions(quizz: Quizz) {
  return QuestionModel.query().where('quizz_id', quizz.id);
}
