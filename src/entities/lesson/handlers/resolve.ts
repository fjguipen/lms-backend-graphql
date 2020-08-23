import { ContentModel } from '../../content/model';
import { Lesson } from '../../../_generated/types';

export async function resolveContents(lesson: Lesson) {
  return ContentModel.query().where('lesson_id', lesson.id).modify('sort');
}
