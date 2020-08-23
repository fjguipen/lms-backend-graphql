import { Student, Professor } from '../../../_generated/types';

export const users: Partial<Student | Professor>[] = [
  {
    id: 1,
    name: 'Student',
    email: 'user1@user.es',
    username: 'student',
    password: 'student',
    completed_lessons: [
      {
        lesson_id: 1,
      },
    ] as any,
    rol: ['std'],
  },
  {
    id: 2,
    name: 'Professor',
    email: 'user2@user.es',
    username: 'professor',
    password: 'professor',
    rol: ['prf'],
  },
  {
    id: 3,
    name: 'Student',
    email: 'user3@user.es',
    username: 'student2',
    password: 'student',
    rol: ['std'],
  },
  {
    id: 4,
    name: 'Admin',
    email: 'user4@user.es',
    username: 'admin',
    password: 'admin',
    rol: ['adm'],
  },
];
