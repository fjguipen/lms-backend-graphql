import { getContent, getContents } from "./handlers/get";
import { resolveQuizz, resolveFormattedText, resolveQuestions } from "./handlers/resolve";
import { authorize } from "../../auth";
import { ROLES } from "../../auth/types";

export default {
  Query:{
    content: authorize(getContent, [ROLES.PROFESSOR]),
    contents: authorize(getContents, [ROLES.PROFESSOR])
  },
  Content: {
    quizz: resolveQuizz,
    text: resolveFormattedText 
  },
  Quizz: {
    questions: resolveQuestions
  }
}