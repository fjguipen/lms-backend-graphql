import { CurrentUser, MutationLoginArgs } from "../_generated/types";
import {
  ResolversContext,
  Session,
  HighOrderReturnType,
  ResolverFuncType
} from "../types";
import { UserModel } from "../entities/models";
import { ApolloError } from "apollo-server-core";

export async function logIn(
  _,
  { input }: MutationLoginArgs,
  ctx: ResolversContext
): Promise<CurrentUser> {
  const user = await UserModel.query()
    .where("username", input.username)
    .first();

  if (!user) {
    throw new ApolloError("Ivalid credentials");
  }

  const { id, name, email, username, password } = user;

  // TODO: Use bcrypt on passwords
  if (password !== input.password) {
    throw new ApolloError("Ivalid credentials");
  }

  const currentUser = {
    id,
    name,
    email,
    username
  };

  ctx.session.user = { id, username };
  return currentUser;
}

export async function logOut(
  _,
  __,
  ctx: ResolversContext
): Promise<CurrentUser> {
  ctx.req.session.destroy(null);
  return null;
}

export async function authenticatedSession(
  req: Express.Request
): Promise<Session> {
  if (req.session.user) {
    // Check user exists
    const user = await UserModel.query().findById(req.session.user.id);
    if (!user) {
      req.session.destroy(() => {});
    }
  }

  return req.session as Session;
}

/**
 * Requester authorization at resolver level
 * @param fn Resolve function being wrapped by this HOF.
 * @param allowedRoles Array of allowed roles.
 * @param silent Turns off raising errors. Just remove requested data if conditions doesn't meet. 
 * Default: false
 */
export function authorize<T extends ResolverFuncType>(
  fn: T,
  allowedRoles: string[],
  silent = false
): HighOrderReturnType<T> {
  return (async (...args: Parameters<ResolverFuncType>) => {
    const ctx: ResolversContext = args[2];
    if (!ctx.session || !ctx.session.user || !ctx.session.user.id) {
      throw new ApolloError("Login required");
    } else {
      const { rol: userRoles } = await UserModel.query().findById(
        ctx.session.user.id
      );

      // Check if userRoles includes any of the allowed roles
      if (
        !userRoles ||
        userRoles.length === 0 ||
        !allowedRoles.some(rol => userRoles.includes(rol) || rol === "*")
      ) {
        if (silent) {
          return null;
        } else {
          throw new ApolloError("Unauthorized");
        }
      }
    }

    return fn(...args);
  }) as HighOrderReturnType<T>;
}
