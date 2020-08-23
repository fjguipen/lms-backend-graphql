import { db } from "../config";
import { users, levels, lessons } from "./mock-data";
import { Model } from "objection";
import { LessonModel, UserModel, LevelModel, QuestionModel } from "../../entities/models";
import { ContentModel, QuizzModel } from "../../entities/content/model";
import { contents } from "./mock-data/contents";
import { EvaluationModel } from "../../entities/evaluation/model";
import { evaluations } from "./mock-data/evaluations";

(async () => {
  Model.knex(db())

  try {
    // Levels
    await LevelModel.query()
      .delete()
    await LevelModel.query()
      .insert(levels).then( async result => {
        await db().raw(`SELECT setval('levels_id_seq', ${result.length})`)
        console.log(`Successfully inserted ${result.length} levels.`)})

    // Lessons
    await LessonModel.query()
      .delete()
    await LessonModel.query()
      .insert(lessons).then( async result => {
        await db().raw(`SELECT setval('lessons_id_seq', ${result.length})`)
        console.log(`Successfully inserted ${result.length} lessons.`)
      })

    // Contents
    await QuestionModel.query()
      .delete()
    await ContentModel.query()
      .delete()
    await ContentModel.query()
      .insertGraph(contents).then( async result => {
        const insertedQuestions = result.filter( (r)=> r.type === 'quizz')
          .flatMap( (c:any) => c.quizz.questions || []).length
        await db().raw(`SELECT setval('contents_id_seq', ${result.length})`)
        await db().raw(`SELECT setval('questions_id_seq', ${insertedQuestions})`)

        console.log(`Successfully inserted ${result.length} lesson contents.`)
      })

    // Users
    await UserModel.query()
      .delete()
    await UserModel.query()
      .insertGraph(users).then( async result => {
        await db().raw(`SELECT setval('users_id_seq', ${result.length})`)
        await db().raw(`SELECT setval('completed_lessons_id_seq', ${result.filter((u:any) => u.completed_lessons).length})`)
        console.log(`Successfully inserted ${result.length} users.`)
      })

    // Evaluations
    await EvaluationModel.query()
      .delete()
    await EvaluationModel.query()
      .insertGraph(evaluations).then( async result => {
        const insertedQuestions = result.flatMap( (r:any) => r.answers || []).length
        await db().raw(`SELECT setval('evaluations_id_seq', ${result.length})`)
        await db().raw(`SELECT setval('answers_id_seq', ${insertedQuestions})`)
        console.log(`Successfully inserted ${result.length} evaluations.`)})

  } catch( err ){
    console.error(err.message)
  }

  process.exit()
})()