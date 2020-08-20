import { Content, QueryContentArgs, QueryContentsArgs } from "../../../_generated/types";
import { ContentModel } from "../model";

export async function getContent(_, { id }: QueryContentArgs): Promise<Content> {
  return await ContentModel.query().findById(id)
}

export async function getContents(_, { input }: QueryContentsArgs): Promise<Content[]> {
  return ContentModel.query()
    .modify( query => {
      for (let key of Object.keys(input)){
        query.where(key, input[key])
      }
    })
}