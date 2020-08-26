import { LessonModel } from '../../lesson/model';
import { Level, Lesson } from '../../../_generated/types';

export async function resolveLessons(level: Level): Promise<Lesson[]> {
  // TODO: use dataloader
  return await LessonModel.query().where('level_id', level.id);
}
