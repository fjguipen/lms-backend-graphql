import { getLevel, getLevels } from "./handlers/get";
import { resolveLessons } from "./handlers/resolve";

export default {
  Query:{
    level: getLevel,
    levels: getLevels
  },
  Level: {
    lessons: resolveLessons
  }
}