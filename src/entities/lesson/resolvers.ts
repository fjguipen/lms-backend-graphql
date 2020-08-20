import { getLesson, getLessons } from "./handlers/get";
import { resolveContents } from "./handlers/resolve";

export default {
  Query:{
    lesson: getLesson,
    lessons: getLessons
  },
  Lesson:{
    contents: resolveContents
  }
}