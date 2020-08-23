import { resolveLessons } from "./handlers/resolve";
import { authorize } from "../../auth";
import { ROLES } from "../../auth/types";
import { LevelModel } from "./model";

export default {
  Query: {
    level: authorize(LevelModel.get, [ROLES.ANY]),
    levels: authorize(LevelModel.getMany, [ROLES.ANY]),
  },
  Level: {
    lessons: resolveLessons,
  },
};
