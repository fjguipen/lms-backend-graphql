import { db } from "../config";

db().schema.raw(`
  CREATE TABLE IF NOT EXISTS users(
    id            serial,
    email         text        unique,
    name          text,
    surname       text,
    username      text,
    password      text,
    rol           varchar(3)[]    DEFAULT '{}'::VARCHAR[],
    created       timestamp(3)    DEFAULT (now() at time zone 'utc'),
    PRIMARY KEY(id)
  );

  CREATE TABLE IF NOT EXISTS levels(
    id            serial,
    title         text,
    description   text,
    PRIMARY KEY(id)
  );

  CREATE TABLE IF NOT EXISTS lessons(
    id               serial,
    description      text,
    PRIMARY KEY(id)
  );

  CREATE TABLE IF NOT EXISTS levels_lessons(
    id               serial,
    level_id         integer,
    lesson_id        integer,
    order_position            integer,
    PRIMARY KEY(level_id, lesson_id),
    FOREIGN KEY(level_id) REFERENCES levels(id) ON DELETE CASCADE,
    FOREIGN KEY(lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS contents(
    id              serial,
    lesson_id       integer,
    type            varchar(45),
    order_position           integer,
    PRIMARY KEY(id),
    FOREIGN KEY(lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    CHECK(type in ('quizzes', 'formatted_text'))
  );

  CREATE TABLE IF NOT EXISTS content_views(
    id              serial,
    user_id         integer,
    content_id      integer,
    created         TIMESTAMP(3)    DEFAULT (now() at time zone 'utc'),
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY(content_id) REFERENCES contents(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS quizzes(
    id              serial,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES contents(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS formatted_text(
    id              serial,
    value           text,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES contents(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS questions(
    id              serial,
    quizz_id        integer,
    text            text,
    type            varchar(45),
    order_position           integer,
    PRIMARY KEY(id),
    FOREIGN KEY(quizz_id) REFERENCES quizzes(id) ON DELETE SET NULL,
    CHECK(type in ('simple', 'multiple', 'open'))
  );

  CREATE TABLE IF NOT EXISTS options(
    id              serial,
    question_id     integer,
    is_correct      boolean,
    PRIMARY KEY(id),
    FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
  );

  CREATE OR REPLACE FUNCTION max_correct_options_allowed() 
  RETURNS trigger AS $max_correct_options_allowed$
  DECLARE 
    type  VARCHAR(45);
  BEGIN
    SELECT type INTO type FROM questions where id = NEW.question_id;

    IF (type = 'simple') THEN
      PERFORM id FROM options
      WHERE is_correct = true 
      AND id <> NEW.id;

      IF FOUND THEN
        RAISE EXCEPTION
          'There is already a correct answer for this question.
          Simple questions can only have one correct answer';
      END IF;
    END IF;
    
    RETURN NEW;
  END;
  $max_correct_options_allowed$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS option_insert_or_update ON options;
  CREATE TRIGGER option_insert_or_update 
  BEFORE INSERT OR UPDATE
  ON options
  FOR EACH ROW
  EXECUTE PROCEDURE max_correct_options_allowed();

  CREATE TABLE IF NOT EXISTS evaluations(
    id              serial,
    user_id         integer,
    quizz_id        integer,
    mark            integer,
    success         boolean,                    
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY(quizz_id) REFERENCES quizzes(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS answers(
    id                serial,
    question_id       integer,
    evaluation_id     integer,
    value             integer,
    PRIMARY KEY(question_id, evaluation_id),
    FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY(evaluation_id) REFERENCES evaluations(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS "sessions" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
  )
  WITH (OIDS=FALSE);
  
  ALTER TABLE "sessions"
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
  
  CREATE INDEX "IDX_session_expire" ON "sessions" ("expire");
`).then( result => {
  console.log("DB initialziation done")
  process.exit()
})
.catch(err => {
  console.log(err.message)
  process.exit()
})