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
  content?: Maybe<Content>;
  contents?: Maybe<Array<Maybe<Content>>>;
  lesson?: Maybe<Lesson>;
  lessons?: Maybe<Array<Maybe<Lesson>>>;
  level?: Maybe<Level>;
  levels?: Maybe<Array<Level>>;
  question?: Maybe<Question>;
  questions?: Maybe<Array<Maybe<Question>>>;
  user?: Maybe<User>;
};


export type QueryContentArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryContentsArgs = {
  input?: Maybe<ContentsFilterInput>;
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
  id?: Maybe<Scalars['Int']>;
};

export type FormattedText = {
  __typename?: 'FormattedText';
  id: Scalars['Int'];
  value?: Maybe<Scalars['String']>;
};

export type Quizz = {
  __typename?: 'Quizz';
  id: Scalars['Int'];
  questions?: Maybe<Array<Maybe<Question>>>;
};

export type Content = {
  __typename?: 'Content';
  id: Scalars['Int'];
  lesson_id?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  order_position?: Maybe<Scalars['Int']>;
  quizz?: Maybe<Quizz>;
  text?: Maybe<FormattedText>;
};

export type ContentsFilterInput = {
  lesson_id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
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
};

export type QuestionFilterInput = {
  quizz_id?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<CurrentUser>;
  logout?: Maybe<CurrentUser>;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  rol?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};
