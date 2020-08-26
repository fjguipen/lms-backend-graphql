import { AnswerInput, Question } from '../../../_generated/types';
import { EvaluationModel } from '../model';
import { ContentModel } from '../../content/model';
import { ApolloError } from 'apollo-server-core';
import { QuestionModel } from '../../question/model';
import { allEntriesUniques } from '../../../tools';
import { LessonModel } from '../../lesson/model';

export async function handleQuizzEvaluation(
  user_id: number,
  quizz_id: number,
  answers: AnswerInput[]
) {
  const quizz = await ContentModel.query().findById(quizz_id);

  if (!quizz || quizz.type !== ContentModel.types.quizz) {
    throw new ApolloError('Wrong data');
  }

  await validityChecks(user_id, quizz_id);

  const questions = await QuestionModel.query()
    .where('quizz_id', quizz_id)
    .withGraphFetched('options');

  if (!allEntriesUniques(answers.map((a) => a.question_id))) {
    throw new ApolloError('More than one answer per question is not allowed');
  }

  if (
    !answers
      .map((a) => a.question_id)
      .every((questionId) => questions.map((q) => q.id).includes(questionId))
  ) {
    throw new ApolloError('All questions must be answered');
  }
  // let mark = 0;
  // let success = false;
  const { mark, success } = getMark(
    // Open answers questions doesnt count towards evaluation
    questions.filter((q) => q.type !== 'open'),
    answers.filter((a) => a.answer && a.answer.length > 0)
  );

  if (success) {
    const lastLessonContent = await ContentModel.query()
      .modify('sort', 'DESC')
      .where('type', ContentModel.types.quizz)
      .where({
        lesson_id: quizz.lesson_id,
      })
      .first();

    if (quizz.id === lastLessonContent.id) {
      LessonModel.markAsCompleted(quizz.lesson_id, user_id);
    }
  }

  return EvaluationModel.query().insert({
    user_id,
    quizz_id,
    mark,
    success,
  });
}

async function validityChecks(user_id: number, quizz_id: number) {
  const alreadySucceeded = await EvaluationModel.query()
    .where({
      user_id,
      quizz_id,
      success: true,
    })
    .first();
  if (alreadySucceeded) {
    throw new ApolloError('Quizz already succeeded');
  }
}

function getMark(
  questions: Question[],
  answers: AnswerInput[]
): { mark: number; success: boolean } {
  let mark = 0;
  let success = false;

  questions.forEach((question) => {
    try {
      const options = answers.find(
        (answer) => answer.question_id === question.id
      ).answer;

      const correctOptions = question.options
        .filter((q) => q.is_correct)
        .map((q) => q.id);
      if (
        options.some((option) => correctOptions.includes(parseInt(option, 10)))
      ) {
        mark++;
      }
    } catch (err) {
      // pass
    }
  });

  if (mark === questions.length) {
    success = true;
  }

  return { mark, success };
}
