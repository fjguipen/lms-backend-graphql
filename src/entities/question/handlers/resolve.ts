import { Question, QuestionOption } from "../../../_generated/types";
import { QuestionOptionModel } from "../model";

export async function resolveOptions(question: Question): Promise<QuestionOption[]>{
  return QuestionOptionModel.query().where('question_id', question.id)
}

export function resolveIsCorrectOption(option: QuestionOption): boolean {
  return option.is_correct
}