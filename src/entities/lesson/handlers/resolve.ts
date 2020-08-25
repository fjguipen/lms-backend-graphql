import { ContentModel } from '../../content/model';
import { Lesson } from '../../../_generated/types';
import { ResolversContext } from '../../../types';
import { UserModel } from '../../user/model';
import { checkContentsRequirements } from '../../content/handlers/requirements';

export async function resolveContents(
  lesson: Lesson,
  __,
  { session }: ResolversContext
) {
  // Check if user can view this contents
  const user = await UserModel.query().findById(session.user.id);
  let contents = await ContentModel.query()
    .where('lesson_id', lesson.id)
    .modify('sort');

  if (!user.rol.includes('prf')) {
    contents = await checkContentsRequirements(user, contents);
  }

  return contents;
}
