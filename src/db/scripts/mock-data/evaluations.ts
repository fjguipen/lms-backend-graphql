import { Evaluation } from '../../../_generated/types';

export const evaluations: Evaluation[] = [
  {
    id: 1,
    user_id: 1,
    quizz_id: 2,
    mark: 2,
    answers: [
      {
        id: 1,
        question_id: 1,
        value: 'Answer 1',
      },
      {
        id: 2,
        question_id: 2,
        value: 'Answer 2',
      },
      {
        id: 3,
        question_id: 3,
        value: 'Answer 3',
      },
      {
        id: 4,
        question_id: 4,
        value: 'Answer 4',
      },
    ],
  },
  {
    id: 2,
    user_id: 1,
    quizz_id: 2,
    mark: 3,
    answers: [
      {
        id: 5,
        question_id: 1,
        value: 'Answer 1',
      },
      {
        id: 6,
        question_id: 2,
        value: 'Answer 2',
      },
      {
        id: 7,
        question_id: 3,
        value: 'Answer 3',
      },
      {
        id: 8,
        question_id: 4,
        value: 'Answer 4',
      },
    ],
    success: true,
  },
  {
    id: 3,
    user_id: 1,
    quizz_id: 4,
    mark: 2,
    answers: [
      {
        id: 9,
        question_id: 5,
        value: 'Answer 1',
      },
      {
        id: 10,
        question_id: 6,
        value: 'Answer 2',
      },
    ],
  },
  {
    id: 4,
    user_id: 3,
    quizz_id: 2,
    mark: 1,
    answers: [
      {
        id: 11,
        question_id: 1,
        value: 'Answer 1',
      },
      {
        id: 12,
        question_id: 2,
        value: 'Answer 2',
      },
      {
        id: 13,
        question_id: 3,
        value: 'Answer 3',
      },
      {
        id: 14,
        question_id: 4,
        value: 'Answer 4',
      },
    ],
  },
];
