import { CurrentUser, MutationLoginArgs } from "../_generated/types";
import { ResolversContext, Session } from "../types";

export async function logIn (_, { input: { username, password } }: MutationLoginArgs, ctx: ResolversContext): Promise<CurrentUser> {
  
  const currentUser = {
    id: "1",
    name: username,
    email: "user1@email.es"
  }

  ctx.session.user = currentUser
  
  return currentUser
}

export async function logOut (_, __, ctx: ResolversContext): Promise<CurrentUser> {
  ctx.req.session.destroy(null);
  return null
}


export function authenticatedSession (req: Express.Request): Session {
  //Check if session & user are still valid
  return req.session as Session
}