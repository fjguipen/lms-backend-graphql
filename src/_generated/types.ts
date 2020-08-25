export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  answer?: Maybe<Answer>;
  answers?: Maybe<Array<Maybe<Answer>>>;
  content?: Maybe<Content>;
  contents?: Maybe<Array<Maybe<Content>>>;
  evaluation?: Maybe<Evaluation>;
  evaluations?: Maybe<Array<Maybe<Evaluation>>>;
  lesson?: Maybe<Lesson>;
  lessons?: Maybe<Array<Maybe<Lesson>>>;
  level?: Maybe<Level>;
  levels?: Maybe<Array<Level>>;
  question?: Maybe<Question>;
  questions?: Maybe<Array<Maybe<Question>>>;
  user?: Maybe<User>;
};


export type QueryAnswerArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryAnswersArgs = {
  iput?: Maybe<AnswerFilterInput>;
};


export type QueryContentArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryContentsArgs = {
  input?: Maybe<ContentsFilterInput>;
};


export type QueryEvaluationArgs = {
  id: Scalars['Int'];
};


export type QueryEvaluationsArgs = {
  input?: Maybe<EvaluationFilterInput>;
};


export type QueryLessonArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryLessonsArgs = {
  input?: Maybe<LessonFilterInput>;
};


export type QueryLevelArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryQuestionArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryQuestionsArgs = {
  input?: Maybe<QuestionFilterInput>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Answer = {
  __typename?: 'Answer';
  id: Scalars['Int'];
  question_id?: Maybe<Scalars['Int']>;
  evaluation_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
};

export type AnswerFilterInput = {
  quizz_id?: Maybe<Scalars['Int']>;
  question_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
  evaluation_id?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createContent?: Maybe<Content>;
  createUser?: Maybe<User>;
  deleteContent?: Maybe<Array<Maybe<Scalars['Int']>>>;
  evaluateQuizz?: Maybe<Evaluation>;
  login?: Maybe<CurrentUser>;
  logout?: Maybe<Scalars['Boolean']>;
  updateContent?: Maybe<Content>;
};


export type MutationCreateContentArgs = {
  input?: Maybe<CreateContentInput>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationDeleteContentArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationEvaluateQuizzArgs = {
  input?: Maybe<EvaluateQuizzInput>;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};


export type MutationUpdateContentArgs = {
  input?: Maybe<UpdateContentInput>;
};

export type FormattedText = Content & {
  __typename?: 'FormattedText';
  id: Scalars['Int'];
  lesson_id?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  order_position?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
};

export type Quizz = Content & {
  __typename?: 'Quizz';
  id: Scalars['Int'];
  lesson_id?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  order_position?: Maybe<Scalars['Int']>;
  questions?: Maybe<Array<Maybe<Question>>>;
};

export type Content = {
  id: Scalars['Int'];
  lesson_id?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  order_position?: Maybe<Scalars['Int']>;
};

export type ContentsFilterInput = {
  lesson_id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type CreateContentInput = {
  type: Scalars['String'];
  questions?: Maybe<Array<Maybe<CreateQuestionInput>>>;
  lesson_id: Scalars['Int'];
  order_position?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
};

export type UpdateContentInput = {
  id: Scalars['Int'];
  questions?: Maybe<Array<Maybe<CreateQuestionInput>>>;
  lesson_id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
};

export type Evaluation = {
  __typename?: 'Evaluation';
  id: Scalars['Int'];
  user_id?: Maybe<Scalars['Int']>;
  author?: Maybe<EvaluationAuthor>;
  quizz_id?: Maybe<Scalars['Int']>;
  mark?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  created?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Answer>>>;
  quizz?: Maybe<Quizz>;
};

export type EvaluationAuthor = {
  __typename?: 'EvaluationAuthor';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type EvaluationFilterInput = {
  user_id?: Maybe<Scalars['Int']>;
  quizz_id?: Maybe<Scalars['Int']>;
};

export type AnswerInput = {
  question_id?: Maybe<Scalars['Int']>;
  answer?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type EvaluateQuizzInput = {
  quizz_id?: Maybe<Scalars['Int']>;
  answers?: Maybe<Array<Maybe<AnswerInput>>>;
};

export type Lesson = {
  __typename?: 'Lesson';
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  level_id?: Maybe<Scalars['Int']>;
  order_position?: Maybe<Scalars['Int']>;
  contents?: Maybe<Array<Maybe<Content>>>;
};

export type LessonFilterInput = {
  level_id?: Maybe<Scalars['Int']>;
};

export type Level = {
  __typename?: 'Level';
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  lessons?: Maybe<Array<Lesson>>;
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['Int'];
  quizz_id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  order_position?: Maybe<Scalars['Int']>;
  options?: Maybe<Array<QuestionOption>>;
};

export type QuestionOption = {
  __typename?: 'QuestionOption';
  id: Scalars['Int'];
  question_id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  is_correct?: Maybe<Scalars['Boolean']>;
};

export type QuestionFilterInput = {
  quizz_id?: Maybe<Scalars['Int']>;
};

export type CreateQuestionOptionInput = {
  text: Scalars['String'];
  is_correct?: Maybe<Scalars['Boolean']>;
};

export type CreateQuestionInput = {
  type: Scalars['String'];
  text: Scalars['String'];
  options?: Maybe<Array<CreateQuestionOptionInput>>;
};

export type UpdateQuestionInput = {
  id: Scalars['Int'];
  type?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  options?: Maybe<Array<CreateQuestionOptionInput>>;
};

export type User = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  rol?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type BaseUser = User & {
  __typename?: 'BaseUser';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  rol?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Professor = User & {
  __typename?: 'Professor';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  rol?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Student = User & {
  __typename?: 'Student';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  rol?: Maybe<Array<Maybe<Scalars['String']>>>;
  evaluations?: Maybe<Array<Maybe<Evaluation>>>;
  completed_lessons?: Maybe<Array<Maybe<Lesson>>>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  rol?: Maybe<Array<Maybe<Scalars['String']>>>;
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  rol?: Maybe<Array<Maybe<Scalars['String']>>>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};
