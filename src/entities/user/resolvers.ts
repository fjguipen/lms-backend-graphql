import { logIn, logOut, authorize } from "../../auth";
import { getUser } from "./handlers/get";
import { ROLES } from "../../auth/types";

export default {
  Query:{
    user: authorize(getUser, [ROLES.PROFESSOR])
  },
  Mutation: {
    login: logIn,
    logout: logOut
  }
}