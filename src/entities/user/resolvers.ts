import { logIn, logOut, authorize } from "../../auth";
import { getUser } from "./handlers/get";
import { ROLES } from "../../auth/types";
import { resolveEvaluations } from "./handlers/resolve";

export default {
  Query:{
    user: authorize(getUser, [ROLES.PROFESSOR])
  },
  User: {
    __resolveType: (source) => {
      if (source.rol.includes('prf')){
        return 'Professor'
      } else {
        return 'Student'
      }
    }
  },
  Student:{
    evaluations: resolveEvaluations,
  },
  Mutation: {
    login: logIn,
    logout: logOut
  },
}