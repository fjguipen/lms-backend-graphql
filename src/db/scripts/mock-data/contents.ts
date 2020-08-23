import { FormattedText, Quizz } from "../../../_generated/types";

interface ContentSeed {
  id: number,
  type: string,
  text?: Partial<FormattedText>
  quizz?: Partial<Quizz>
  lesson_id: number
  order_position: number
}

export const contents: ContentSeed[] = [
  {
    id: 1,
    type: 'formatted_text',
    text: {
      value: `<p>Text</p><img src="url"/><p>Text</p>`
    },
    lesson_id: 1,
    order_position: 0
  },
  {
    id: 2,
    type: 'quizz',
    quizz: {
      questions: [
        {
          id: 1,
          text: 'Pregunta uno',
          type: 'simple',
          options: [{
            id: 1,
            text: 'Opcion 1',
            is_correct: false
          },{
            id: 2,
            text: 'Opcion 2',
            is_correct: true
          }],
          order_position: 0
        },
        {
          id: 2,
          text: 'Pregunta dos',
          type: 'multiple',
          options: [{
            id: 3,
            text: 'Opcion 1',
            is_correct: false
          },{
            id: 4,
            text: 'Opcion 2',
            is_correct: true
          },{
            id: 5,
            text: 'Opcion 3',
            is_correct: true
          }],
          order_position: 1
        },
        {
          id: 3,
          text: 'Pregunta tres',
          type: 'simple',
          options: [{
            id: 6,
            text: 'Opcion 1',
            is_correct: true
          },{
            id: 7,
            text: 'Opcion 2',
            is_correct: false
          }],
          order_position: 2
        },
        {
          id: 4,
          text: 'Pregunta cuatro',
          type: 'open',
          order_position: 3
        }
      ]
    },
    lesson_id: 1,
    order_position: 1
  },
  {
    id: 3,
    type: 'formatted_text',
    text: {
      value: `<p>Text</p><img src="url"/><p>Text</p>`
    },
    lesson_id: 1,
    order_position: 2
  },
  {
    id: 4,
    type: 'quizz',
    quizz: {
      questions: [
        {
          id: 5,
          text: 'Pregunta cinco',
          type: 'simple',
          options: [{
            id: 8,
            text: 'Opcion 1',
            is_correct: false
          },{
            id: 9,
            text: 'Opcion 2',
            is_correct: true
          }],
          order_position: 0
        },
        {
          id: 6,
          text: 'Pregunta seis',
          type: 'simple',
          options: [{
            id: 10,
            text: 'Opcion 1',
            is_correct: true
          },{
            id: 11,
            text: 'Opcion 2',
            is_correct: false
          }],
          order_position: 1
        }
      ]
    },
    lesson_id: 1,
    order_position: 3
  },
  {
    id: 5,
    type: 'formatted_text',
    text: {
      value: `<p>Text</p><img src="url"/><p>Text</p>`
    },
    lesson_id: 2,
    order_position: 0
  },
  {
    id: 6,
    type: 'formatted_text',
    text: {
      value: `<p>Text</p><img src="url"/><p>Text</p>`
    },
    lesson_id: 2,
    order_position: 1
  },
]