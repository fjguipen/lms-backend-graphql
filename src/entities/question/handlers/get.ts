import { QueryQuestionArgs, QueryQuestionsArgs, Question } from "../../../_generated/types";
import { QuestionModel } from "../model";

export async function getQuestion(_, { id }: QueryQuestionArgs): Promise<Question>{
  return QuestionModel.query().findById(id)
}

export async function getQuestions(_, { input }: QueryQuestionsArgs): Promise<Question[]>{
  return QuestionModel.query()
    .modify('sort')
    .modify( query => {
      for (let key of Object.keys(input)){
        query.where(key, input[key])
      }
    })
}