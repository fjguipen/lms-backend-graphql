import { User, QueryUserArgs } from "../../../_generated/types";
import { UserModel } from "../model";


export async function getUser(_, { id }: QueryUserArgs): Promise<User>{
  const user = await UserModel.query()
    .where('id', id)
    .first()
  
  return user
}