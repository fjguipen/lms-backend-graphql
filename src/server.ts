import express from 'express';
import session from 'express-session';
import { v4 as geenuuid } from 'uuid';
import { db } from './db/config';
import { ApolloServer, makeExecutableSchema, gql } from 'apollo-server-express';

import typeDefs from './gql/typeDefs';
import resolvers from './gql/resolvers';

const app = express();
const PgSession = require('connect-pg-simple')(session);


app.use(session({
  name: "sessid",
  genid: function (req) {
    return geenuuid()
  },
  secret: process.env.SECRET_KEY,
  resave: false,
  proxy: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  },
  store: new PgSession({
    tableName: `sessions`,
    conString: `postgres://postgres:psql@db:5432/z1lms`

  })
}))

app.get('/', (req, res) => {
  // db().raw('select 1').then( result => {
  //   res.send("")
  // })
  return res.redirect('/gql')
})

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  playground: process.env.NODE_ENV === 'production' ? false : { 
    settings:{
      'request.credentials': 'include',
    }
  },
  context: async ({ req,res }) => {
    return {
      req,
      res
      // models,
      // currentUser: await getCurrentUser(req),
      // loaders: getLoaders(),
    }
  }
});

const url = process.env.APP_URL || 'http://localhost';
const path = process.env.API_PATH || '/gql';

server.applyMiddleware({ app, path: path}); // cors: corsOptions });

app.listen(3001, () => {
  console.log("Server listening on localhost:3001")
})