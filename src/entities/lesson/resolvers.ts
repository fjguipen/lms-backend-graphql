import { getLesson, getLessons } from "./handlers/get";
import { resolveContents } from "./handlers/resolve";
import { authorize } from "../../auth";
import { ROLES } from "../../auth/types";

export default {
  Query:{
    lesson: authorize(getLesson, [ROLES.ANY]),
    lessons: authorize(getLessons, [ROLES.ANY])
  },
  Lesson:{
    contents: resolveContents
  }
}