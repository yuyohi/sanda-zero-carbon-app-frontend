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
  dailyTotalPoint: number;
  dailyMaxMissionPoint: number;
};

export type {
  Mission,
  DailyMission,
  UserDto,
  UserDailyStatus,
  UserLevelStatus,
};
