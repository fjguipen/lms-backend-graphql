export const contents = [
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
    type: 'quizzes',
    quizz: {
      questions: [
        {
          id: 1,
          text: 'Pregunta uno',
          type: 'simple'
        },
        {
          id: 2,
          text: 'Pregunta dos',
          type: 'multiple'
        },
        {
          id: 3,
          text: 'Pregunta tres',
          type: 'simple'
        },
        {
          id: 4,
          text: 'Pregunta cuatro',
          type: 'open'
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
    type: 'quizzes',
    quizz: {
      questions: [
        {
          id: 5,
          text: 'Pregunta cinco',
          type: 'simple'
        },
        {
          id: 6,
          text: 'Pregunta seis',
          type: 'simple'
        }
      ]
    },
    lesson_id: 1,
    order_position: 3
  },
]