import express from 'express';
// import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import { v4 as geenuuid } from 'uuid'
const app = express();
import { db } from './db/config'

app.use(session({
  name: "sessid",
  genid: function (req) {
    return geenuuid()
  },
  secret: process.env.SECRET_KEY,
  resave: false,
  proxy: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  },
  // store: new PgSession({
  //   tableName: `${dbPrefix}session`
  // })
}))

app.get('/', (req, res) => {
  db().raw('select 1').then( result => {
    res.send("Hello world!!")
  })
})

app.listen(3001, () => {
  console.log("Server listening on localhost:3001")
})