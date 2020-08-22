import express from 'express';
import session from 'express-session';
import { v4 as geenuuid } from 'uuid';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';

import typeDefs from './gql/typeDefs';
import resolvers from './gql/resolvers';
import { ResolversContext } from './types';
import { authenticatedSession } from './auth';
import { db } from './db/config';
import { Model } from 'objection';

const app = express();
const PgSession = require('connect-pg-simple')(session);

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env
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
  store: new PgSession({
    tableName: `sessions`,
    conString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`

  })
}))

app.get('/', (req, res) => {
  return res.redirect('/gql')
})

//Bind knex to Obection Model class
Model.knex(db())

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
  context: async ({ req, res }): Promise<ResolversContext> => {
    return {
      req,
      res,
      session: await authenticatedSession(req)
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