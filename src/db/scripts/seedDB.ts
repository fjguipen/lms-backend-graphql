import { db } from "../config";
import { users, levels, lessons } from "./mock-data";
import { Model } from "objection";
import { LessonModel, UserModel, LevelModel, QuestionModel } from "../../entities/models";
import { ContentModel } from "../../entities/content/model";
import { contents } from "./mock-data/contents";

(async () => {
  Model.knex(db())

  try {
    // Users
    await UserModel.query()
      .delete()
    await UserModel.query()
      .insert(users).then( result => console.log(`Successfully iserted ${result.length} users.`))

    // Levels
    await LevelModel.query()
      .delete()
    await LevelModel.query()
      .insert(levels).then( result => console.log(`Successfully iserted ${result.length} levels.`))

    // Lessons
    await LessonModel.query()
      .delete()
    await LessonModel.query()
      .insert(lessons).then( result => console.log(`Successfully iserted ${result.length} lessons.`))

    // Contents
    await QuestionModel.query()
    .delete()
    await ContentModel.query()
      .delete()
    await ContentModel.query()
      .insertGraph(contents).then( result => console.log("Contents successfully inserted."))

  } catch( err ){
    console.error(err.message)
  }

  process.exit()
})()