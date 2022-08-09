/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from '@mui/material/Grid';
import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import CircularLevelView from './CircularLevelView';
import DailyLimitPoint from './DailyLimitPoint';
import DailyMissonList from './DailyMissionList';
import MissionList from './MissonList';

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

const missions: Array<Mission> = [
  {
    missionId: 1,
    title: 'Mission1',
    point: 5,
    description: 'TestMisson1',
    CO2Reduction: 10.0,
    costReduction: 10.0,
    difficulty: 'easy',
    missionType: 'DoType',
    tagId: 1,
    keyword: 'マーマレードジャム',
  },
  {
    missionId: 1,
    title: 'Mission2',
    point: 10,
    description: 'TestMisson2',
    CO2Reduction: 15.0,
    costReduction: 15.0,
    difficulty: 'normal',
    missionType: 'TimeType',
    tagId: 1,
    keyword: 'いちごジャム',
  },
  {
    missionId: 1,
    title: 'Mission3',
    point: 15,
    description: 'TestMisson3',
    CO2Reduction: 20.0,
    costReduction: 20.0,
    difficulty: 'hard',
    missionType: 'TimeType',
    tagId: 1,
    keyword: 'ブルーベリージャム',
  },
];

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

const dailyMissions: Array<DailyMission> = [
  {
    title: 'Mission1',
    dailyMissionId: 1,
    missionId: 1,
    point: 10,
    description: 'TestMission1',
    co2Reduction: 100,
    costReduction: 100,
    difficulty: 'easy',
    tagId: 1,
    keyword: 'いちご',
  },
  {
    title: 'Mission2',
    dailyMissionId: 2,
    missionId: 2,
    point: 20,
    description: 'TestMission2',
    co2Reduction: 150,
    costReduction: 150,
    difficulty: 'nomal',
    tagId: 2,
    keyword: 'みかん',
  },
  {
    title: 'Mission3',
    dailyMissionId: 3,
    missionId: 3,
    point: 30,
    description: 'TestMission3',
    co2Reduction: 200,
    costReduction: 200,
    difficulty: 'hard',
    tagId: 3,
    keyword: 'ぶどう',
  },
];

type UserLevelStatus = {
  totalPoint: number;
  level: number;
  nextLevelPercentage: number;
};

const MissionView = () => {
  const [missonList, setMissionList] = useState();
  const [dailyMissionList, setDailyMissionList] = useState();
  const [userLevelStatus, setUserLevelStatus] = useState();
  const [userDailyStatus, setuserDailyStatus] = useState();

  return (
    <Container
      sx={{
        width: '100%',
        m: '1rem',
        position: 'relative',
        top: '1rem',
        left: '0',
        right: '0',
        overflowY: 'auto',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5.9} sx={{ m: '0.1rem', mb: '0.5rem' }}>
          <CircularLevelView variant="determinate" value={80} size="10rem" />
        </Grid>
        <Grid item xs={12} sm={5.9} sx={{ m: '0.1rem', mb: '0.5rem' }}>
          <DailyLimitPoint variant="determinate" value={80} />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DailyMissonList dailyMissionList={dailyMissions} />
        </Grid>
        <Grid item xs={12}>
          <MissionList missionList={missions} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MissionView;
