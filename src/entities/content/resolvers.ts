import { getContent, getContents } from "./handlers/get";
import { resolveQuizz, resolveFormattedText, resolveQuestions } from "./handlers/resolve";

export default {
  Query:{
    content: getContent,
    contents: getContents
  },
  Content: {
    quizz: resolveQuizz,
    text: resolveFormattedText 
  },
  Quizz: {
    questions: resolveQuestions
  }
}