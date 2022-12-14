type Mission = {
  missionId: number;
  title: string;
  point: number;
  description: string;
  co2Reduction: number;
  costReduction: number;
  difficulty: string;
  missionType: string;
  tagId: number;
  keyword: string;
};

type DailyMission = {
  title: string;
  dailyMissionId: number;
  missionId: number;
  point: number;
  description: string;
  co2Reduction: number;
  costReduction: number;
  difficulty: string;
  tagId: number;
  keyword: string;
};

type UserDto = {
  userId: string;
  age: number;
  totalPoint: number;
  level: number;
  nextLevelPercentage: number;
  levelRate: number;
};

type UserLevelStatus = {
  totalPoint: number;
  level: number;
  levelRate: number;
  nextLevelPercentage: number;
};

type UserDailyStatus = {
  dailyQuizPoint: number;
  dailyMissionPoint: number;
  dailyMaxMissionPoint: number;
};

type Quiz = {
  quizId: number;
  title: string;
  quizSentence: string;
  explain: string;
  answerList: Array<string>;
  point: number;
  tagId: number;
  keyword: string;
  correctAnsNum: number;
};

type QuizCategory = 'unanswer' | 'incorrect' | 'correct';

type CategorizeQuiz = {
  category: QuizCategory;
  quiz: Array<Quiz>;
};

type AppBarSetting = {
  src: string;
  alt: string;
  width: number;
  to: string;
};

type QuizAnswer = {
  quizId: number;
  title: string;
  quizSentence: string;
  explaination: string;
  point: number;
  tagId: number;
  keyword: string;
  correctAnsNum: number;
  answeredAt: string;
  answeredQuizId: number;
  isCorrect: boolean;
  userAnsNum: number;
  userId: string;
};

type Article = {
  // Articleのtype定義
  articleId: number;
  title: string;
  tagId: number;
  description: string;
  postedAt: Date;
  thumbnailSource: string;
  isImportant: boolean;
  url: string;
};

export type {
  Mission,
  DailyMission,
  UserDto,
  UserDailyStatus,
  UserLevelStatus,
  Quiz,
  AppBarSetting,
  CategorizeQuiz,
  QuizCategory,
  QuizAnswer,
  Article,
};
