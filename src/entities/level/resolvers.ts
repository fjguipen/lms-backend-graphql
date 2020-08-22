import { getLevel, getLevels } from "./handlers/get";
import { resolveLessons } from "./handlers/resolve";
import { authorize } from "../../auth";
import { ROLES } from "../../auth/types";

export default {
  Query:{
    level: authorize(getLevel, [ROLES.ANY]),
    levels: authorize(getLevels, [ROLES.ANY])
  },
  Level: {
    lessons: resolveLessons
  }
}