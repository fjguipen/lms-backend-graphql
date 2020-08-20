import { User } from "../../../_generated/types";

export const users: Partial<User>[] = [
  {
    id: 1,
    name: 'Student',
    email: 'userone@user.es',
    username: "student",
    password: "student",
    rol: ["std"]
  },
  {
    id: 2,
    name: 'Professor',
    email: 'usertwo@user.es',
    username: "professor",
    password: "professor",
    rol: ["prf"]
  },
]
