import { LessonModel } from '../../lesson/model';
import { Level, Lesson } from '../../../_generated/types';
import { ResolversContext } from '../../../types';
import { UserModel } from '../../user/model';
import { filterLessonsByRequirements } from '../../lesson/handlers/requirements';

export async function resolveLessons(
  level: Level,
  __,
  { session }: ResolversContext
): Promise<Lesson[]> {
  const lessons = await LessonModel.query().where('level_id', level.id);
  const user = await UserModel.query().findById(session.user.id);
  if (!user.rol.includes('prf')) {
    // Give only available lessons
    return filterLessonsByRequirements(user, lessons);
  }

  return lessons;
}
