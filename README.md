# Z1 senior backend - Learning Management System

## Setup
Deployment is based entirely on docker. We use docker to set up the instances for 3 different servcices:
  - Database (PostgresSQL)
  - Proxy (Nginx)
  - API (Node App)

This means that **no code is builded on the host machine** (If you want, you can run *tsc* at your own in host directory to fix "requirements" and "imports" on source code)

There is a docker-compose.override-template file to change the behaviuour of the deployment, creating a shared volume between host and the container for better development experience with watch mode and hot reloading.

The api server is setted to be listening on **localhost/gql** by default

### Requirements (Ubuntu)
What we need installed in our system: 
  - docker, docker-compose, node, npm/yarn.
  - Freed up ports 80 and 5432 (No instance of postgresql, nginx or any other proxy running)


### First time deployment
This script will initializate the dabase with the data model and run the server

With npm:
```
npm run deploy:dev
```
With yarn
```
yarn deploy:dev
```

### Subsequent deployment
With the database already populated we only need to take the container runing

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
This proyect consist in the backend for an API that fulfills the needs of a LMS. We have three different available users: adminers, professors and students, and the actions that they can take over the API are restricted by their roles.

The only pourpse of adminers is to create other users.

Professors can manipulate all contents in the system, creating lessons with diferent contents along the different levels of difficulty. Professors also are the only ones with access to students personal and academic data like evaluations (quizzes, answers, marks...), accessed contents, etc.

Students can only access lessons if the previous one has been completed. They are the most restricted user, they can only acces contents through lessons and the need to take and succeed on quizzes to gain access for contents that are beyond those quizzes.


## DataModel
More info at: [DataModel docs](src/db/docs.md)

## Testing
There is a ready to import file for [Insomnia](https://insomnia.rest/),  preloaded with many of the queries and mutations that can be runned against the server. Just import the file and start playing with the api! :rocket:.

