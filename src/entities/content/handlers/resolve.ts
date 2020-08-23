import { Content, Quizz } from '../../../_generated/types';
import { QuizzModel, FormattedTextModel } from '../model';
import { QuestionModel } from '../../question/model';

export async function resolveQuizz(content: Content) {
  if (content.type !== 'quizz') {
    return null;
  }

  return QuizzModel.query().findById(content.id);
}

export async function resolveFormattedText(content: Content) {
  if (content.type !== 'formatted_text') {
    return null;
  }

  return FormattedTextModel.query().findById(content.id);
}

export async function resolveQuestions(quizz: Quizz) {
  return QuestionModel.query().where('quizz_id', quizz.id);
}
