import { logIn, logOut } from "../../auth";
import { getUser } from "./handlers/get";

export default {
  Query:{
    user: getUser
  },
  Mutation: {
    login: logIn,
    logout: logOut
  }
}