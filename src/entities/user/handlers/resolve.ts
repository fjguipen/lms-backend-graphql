import { User } from "../../../_generated/types";
import { EvaluationModel } from "../../evaluation/model";

export function resolveEvaluations(user: User){
  return EvaluationModel.query()
    .where('user_id', user.id)
}