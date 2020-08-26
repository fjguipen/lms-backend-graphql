# Z1 senior backend - Learning Management System

## Table of contents

- [Setup](#setup)
- [About the proyect](#about-the-proyect)
- [Assumptions and Decisions](#assumptions-and-decisions)
- [Using the API](#using-the-api)

## Setup

Deployment is based entirely on docker. We use docker to set up the instances for 3 different servcices:

- Database (PostgresSQL)
- Proxy (Nginx)
- API (Node App)

This means that **no code is builded on the host machine** (If you want, you can run _tsc_ at your own in host directory to fix "requirements" and "imports" on source code)

There is a docker-compose.override-template file to change the behaviuour of the deployment, creating a shared volume between host and the container for better development experience with watch mode and hot reloading.

The api server is setted to be listening on **localhost/gql** by default

### Requirements (Ubuntu)

What we need installed in our system:

- docker, docker-compose, node, npm/yarn.
- Freed up ports 80 and 5432 (No instance of postgresql, nginx or any other proxy running)

### First time deployment

Copy or rename [example.env](example.env) into .env

This script will **initializate the dabase** with the data model and **start the server**, so you don't need to run any other command unless you stop the containers:

With npm:

```
npm run deploy:dev
```

With yarn

```
yarn deploy:dev
```

Go to **_localhost/gql_** or open [**Insomnia**](#using-the-api).

### Subsequent deployment

If we already called deploy:dev previosly, then we only need to take the container runing up:

With npm:

```
npm run dc:up
```

With yarn

```
yarn dc:up
```

### Check logs

With npm:

```
npm run dc:logs
```

With yarn

```
yarn dc:logs
```

## About the proyect

This proyect is the backend for an API that fulfills the needs of a LMS. We have three different available users: adminers, professors and students, and the actions that they can take over the API are restricted by their roles.

The only pourpse of adminers is to create other users.

Professors can manipulate all contents in the system, creating lessons with diferent contents along the different levels of difficulty. Professors also are the only ones with access to students personal and academic data like evaluations (quizzes, answers, marks...), accessed contents, etc.

Students can only access lessons if the previous one has been completed. They are the most restricted user, they can only acces contents through lessons and they need to take and pass the quizzes to gain access for contents that are beyond those quizzes.

## Assumptions and Decisions

- Contents are added sequentially and can't be re-ordered at this point.
- User content views registration is called by specific mutation for that pourpose.
- Open ended questions do not count towards the success of the quizz, so validation can be taken instantly on quizz submitting.
- Succeeded quizzes can be taken only once.
- There are missing CRUD for some entities, only lesssons and contents have full CRUD operations.
- There is no validations neither sanitize apart from graphql types.
- Text Content: The text formatting will be HTML markup so it's stored as plain string.

## Using the API

There is a ready to import [file](insomnia_export.json) for [Insomnia](https://insomnia.rest/), preloaded with many of the queries and mutations that can be runned against the server. Just import the file and start playing with the api! :rocket:.

### Starting point of mocked data

The database is seeded with 3 levels (**"Básico"**[id1], **"Intermedio"**[id2] and **"Avanzado"**[id3], each of them with some contents (Quizzes and Texts)

There are also 4 user, **student1**[id1], **professor**[id2] **student2**[id3] and **"admin"**[id4].
"student1" has completed the **"Lesson A"**[id1] (from Level "Básico") and have acces to the **"Lesson B"**[id2] of the same level.

In the other hand, "student2" has not finished the "Lesson A" yet and he must take and pass the last quizz to unlock the rest of contents of the "Lesson A" and get the "Lesson B" available. (You can login as "student2" and run TakeQuizz mutation to gain access past "Lesson A" on "student2". All needed mutations and queries are setted on **Insomnia**)
