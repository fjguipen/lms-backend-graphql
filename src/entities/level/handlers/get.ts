import { QueryLevelArgs, Level } from "../../../_generated/types";
import { LevelModel } from "../model";

export async function getLevel(_, { id }:QueryLevelArgs): Promise<Level>{
  return await LevelModel.query().findById(id)
}

export async function getLevels(): Promise<Level[]>{
  return await LevelModel.query()
}