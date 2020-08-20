import { CurrentUser } from "./_generated/types";

export interface Session {
  user?: CurrentUser
}

export interface ResolversContext{
  req: Express.Request
  res: Express.Response
  session?: Session
}