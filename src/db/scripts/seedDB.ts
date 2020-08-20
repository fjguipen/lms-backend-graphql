import { db } from "../config";
import { User as UserType } from "../../_generated/types";


const users: Partial<UserType>[] = [
  {
    name: 'Student',
    email: 'userone@user.es',
    username: "student",
    password: "student",
    rol: ["std"]
  },
  {
    name: 'Professor',
    email: 'usertwo@user.es',
    username: "professor",
    password: "professor",
    rol: ["prf"]
  },
]

db().delete().from('users').then( result => {
  db().insert(users).returning('id').into('users').then( (result) => {
    console.log(`Successfully iserted ${result.length} users.`)
    process.exit()
  }).catch( err => {
    console.log("Error: " + err.message)
    process.exit()
  })
})
