require("dotenv").config();
import Knex from "knex";

export const config = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: "./db/migrations",
  },
};

const instance: Knex = Knex(config as Knex.Config);

export const db = () => instance;
