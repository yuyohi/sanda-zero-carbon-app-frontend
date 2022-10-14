type Mission = {
  missionId: number;
  title: string;
  point: number;
  description: string;
  CO2Reduction: number;
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
  ans1: string;
  ans2: string;
  ans3: string;
  ans4: string;
  point: number;
  tagId: number;
  keyword: string;
  correctAns: string;
};

type QuizCategory = 'unAnswered' | 'notCorrect' | 'correct';

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
};
