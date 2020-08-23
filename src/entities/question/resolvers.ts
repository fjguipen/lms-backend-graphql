import { getQuestions, getQuestion } from "./handlers/get";
import { resolveOptions, resolveIsCorrectOption } from "./handlers/resolve";
import { ROLES } from "../../auth/types";
import { authorize } from "../../auth";

export default {
  Query: {
    question: authorize(getQuestion, [ROLES.PROFESSOR]),
    questions: authorize(getQuestions, [ROLES.PROFESSOR]),
  },
  Question: {
    options: resolveOptions,
  },
  QuestionOption: {
    is_correct: authorize(resolveIsCorrectOption, [ROLES.PROFESSOR], true),
  },
};
