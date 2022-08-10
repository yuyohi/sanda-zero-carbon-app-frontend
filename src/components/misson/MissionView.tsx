/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from '@mui/material/Grid';
import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ky from 'ky';
import { useRecoilValue } from 'recoil';
import CircularLevelView from './CircularLevelView';
import DailyLimitPoint from './DailyLimitPoint';
import DailyMissionList from './DailyMissionList';
import MissionList from './MissonList';
import Response from '../../utils/response';
import {
  DailyMission,
  Mission,
  UserDailyStatus,
  UserDto,
  UserLevelStatus,
} from './TypeDefinition';
import userState from '../../atoms/userAtom';

/*
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
*/

/*
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
*/

const MissionView = () => {
  const [missionList, setMissionList] = useState<Array<Mission> | undefined>();
  const [dailyMissionList, setDailyMissionList] = useState<
    Array<DailyMission> | undefined
  >();
  const [userLevelStatus, setUserLevelStatus] = useState<
    UserLevelStatus | undefined
  >();
  const [userDailyStatus, setuserDailyStatus] = useState<
    UserDailyStatus | undefined
  >();
  const [reloadCount, setReloadCount] = useState<number>(0);

  const uid = useRecoilValue(userState);

  useEffect(() => {
    const fetchMission = async () => {
      const response: Response<Array<Mission>> = await ky(
        'http://localhost:18080/api/mission',
      ).json();
      const missions = response.result;
      setMissionList(missions);
    };
    const fetchDailyMission = async () => {
      const response: Response<Array<DailyMission>> = await ky(
        `http://localhost:18080/api/daily-mission/${uid}`,
      ).json();
      const dailyMissions = response.result ? response.result : undefined;
      setDailyMissionList(dailyMissions);
    };
    const fetchUserLevelStatus = async () => {
      const response: Response<UserDto> = await ky(
        `http://localhost:18080/api/user?userId=${uid}`,
      ).json();
      const uLevelStatus: UserLevelStatus = {
        totalPoint: response.result.totalPoint,
        level: response.result.level,
        levelRate: response.result.levelRate,
        nextLevelPercentage: response.result.nextLevelPercentage,
      };
      setUserLevelStatus(uLevelStatus);
    };
    const fetchUserDailyStatus = async () => {
      const response: Response<UserDailyStatus> = await ky(
        `http://localhost:18080/api/user/daily?userId=${uid}`,
      ).json();
      const uDailyStatus = response.result;
      setuserDailyStatus(uDailyStatus);
    };

    void fetchMission();
    void fetchDailyMission();
    void fetchUserLevelStatus();
    void fetchUserDailyStatus();
  }, [reloadCount, uid]);

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
          {userLevelStatus && (
            <CircularLevelView userLevelStatus={userLevelStatus} />
          )}
        </Grid>
        <Grid item xs={12} sm={5.9} sx={{ m: '0.1rem', mb: '0.5rem' }}>
          {userDailyStatus && (
            <DailyLimitPoint userDailyStatus={userDailyStatus} />
          )}
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {dailyMissionList && (
            <DailyMissionList
              dailyMissionList={dailyMissionList}
              setReloadCount={setReloadCount}
              reloadCount={reloadCount}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {missionList && (
            <MissionList
              missionList={missionList}
              setReloadCount={setReloadCount}
              reloadCount={reloadCount}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MissionView;
