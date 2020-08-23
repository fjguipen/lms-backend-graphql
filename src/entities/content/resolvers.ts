import { getContent, getContents } from "./handlers/get";
import { resolveQuizz, resolveFormattedText, resolveQuestions } from "./handlers/resolve";
import { authorize } from "../../auth";
import { ROLES } from "../../auth/types";
import { ContentModel } from "./model";

export default {
  Query:{
    content: authorize(ContentModel.getOne, [ROLES.PROFESSOR]),
    contents: authorize(ContentModel.getMany, [ROLES.PROFESSOR])
  },
  Mutation: {
    createContent: authorize(ContentModel.create, [ROLES.PROFESSOR]),
    updateContent: authorize(ContentModel.update, [ROLES.PROFESSOR]),
    deleteContent: () => null,
  },
  Content: {
    quizz: resolveQuizz,
    text: resolveFormattedText 
  },
  Quizz: {
    questions: resolveQuestions
  }
}