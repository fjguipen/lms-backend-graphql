import { logIn, logOut } from "../../auth";

export default {
  Query:{
    user: () => "Hello world: user"
  },
  Mutation: {
    login: logIn,
    logout: logOut
  }
}