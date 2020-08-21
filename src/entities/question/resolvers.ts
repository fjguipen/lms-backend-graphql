import { getQuestions, getQuestion } from "./handlers/get";

export default {
  Query:{
    question: getQuestion,
    questions: getQuestions,
  },
  Question:{
    options: () => null
  }
}