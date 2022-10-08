/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint no-unused-expressions: "off" */
/* eslint-disable no-shadow */
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import ky from 'ky';
import { useRecoilValue } from 'recoil';
import Response from '../../utils/response';
import userState from '../../atoms/userAtom';
import CustomAppBar from '../customAppBar';
import AchievementList from './AchievementList';
import AchievementGraph from './AchievementGraph';

type Achievement = {
  title: string;
  missionType: string;
  hour: number;
  getPoint: number;
  getCo2Reduction: number;
  getcostReduction: number;
  achievedAt: Date;
  isDailyMission: boolean;
};

// グラフ用計算
const weekday = [0, 1, 2, 3, 4, 5, 6];
type TotalStatus = { co2: number; point: number; cost: number };
const calculateMap = new Map<number, TotalStatus>();
weekday.forEach((day) => {
  calculateMap.set(day, { co2: 0, point: 0, cost: 0 });
});
const getTotal = (achievements: Achievement[]) => {
  achievements.forEach((achievement) => {
    weekday.forEach((week) => {
      const date = new Date(achievement.achievedAt);
      if (week === date.getDay()) {
        const status = calculateMap.get(week);
        if (status !== undefined) {
          status.co2 += achievement.getCo2Reduction;
          status.point += achievement.getPoint;
          status.cost += achievement.getcostReduction;
        }
        console.log(status);
      }
    });
  });

  return calculateMap;
};

const LookbackView = () => {
  const [achievementList, setAchievementList] = useState<
    Array<Achievement> | undefined
  >();
  const [achievementMap, setAchievementMap] = useState<
    Map<number, TotalStatus> | undefined
  >();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const uid: string = useRecoilValue(userState);

  useEffect(() => {
    const fetchAchievement = async () => {
      const response: Response<Array<Achievement>> = await ky(
        `http://localhost:18080/api/achievement/weekly?userId=${uid}&date=2022/10/07`,
      ).json();
      const achievements = response.result;
      setAchievementList(achievements);
      const achievementMap = getTotal(achievements);
      setAchievementMap(achievementMap);
    };
    void fetchAchievement();
  }, [uid]);

  return (
    <Container>
      <CustomAppBar />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {achievementMap && (
            <AchievementGraph achievementMap={achievementMap} />
          )}
        </Grid>
        <Grid item xs={12}>
          {achievementList && (
            <AchievementList achievementList={achievementList} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default LookbackView;
