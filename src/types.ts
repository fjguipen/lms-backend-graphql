import { CurrentUser } from "./_generated/types";

export interface Session {
  user?: CurrentUser;
}

export interface ResolversContext {
  req: Express.Request;
  res: Express.Response;
  session?: Session;
}

export type FuncType = (...args: any[]) => any;
export type ResolverFuncType = (
  source: any,
  args: any,
  context: ResolversContext,
  info: any
) => any;
export type HighOrderReturnType<T extends FuncType | ResolverFuncType> = (
  ...args: Parameters<T>
) => ReturnType<T>;
