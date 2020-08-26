import {
  CreateContentInput,
  UpdateContentInput,
} from '../../../_generated/types';
import { ApolloError } from 'apollo-server-express';
import { ContentModel, FormattedTextModel } from '../model';

export function loadFormattedTextData(input: CreateContentInput, graph) {
  if (!input.text) {
    throw new ApolloError('Invalid data: Missing text');
  }
  graph['text'] = {
    value: input.text,
  };
}

export async function handleUpdateFormattedText(
  content: ContentModel,
  input: UpdateContentInput
) {
  if (!input.text) {
    throw new ApolloError('Invalid data: Missing formatted text');
  }

  await content.$relatedQuery('text').patch({
    value: input.text,
  } as FormattedTextModel);
}
