/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint no-unused-expressions: "off" */
/* eslint-disable no-shadow */
import Grid from '@mui/material/Grid';
import { Box, Card, Container, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ky from 'ky';
import { useRecoilValue } from 'recoil';
import Response from '../../utils/response';
import userState from '../../atoms/userAtom';
import CustomAppBar from '../customAppBar';
import AchievementList from './AchievementList';
import AchievementGraph from './AchievementGraph';
import prevButton from '../../assets/lookback_prevweek.png';
import nextButton from '../../assets/lookback_nextweek.png';
import flame from '../../assets/flame_1.png';
import WeeklyButton from './WeeklyButton';
import { bodyBigTypographyStyle } from '../../utils/customStyles';

/* 達成の型 */
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

/* グラフ表示用の定義・計算メソッド */
const weekday = [1, 2, 3, 4, 5, 6, 0];
type TotalStatus = { co2: number; point: number; cost: number };
const calculateMap = new Map<number, TotalStatus>();
const getTotal = (achievements: Achievement[]) => {
  weekday.forEach((day) => {
    calculateMap.set(day, { co2: 0, point: 0, cost: 0 });
  });
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
      }
    });
  });

  return calculateMap;
};

const BodyBox = styled(Box)({
  padding: '2%',
  width: '100vw',
  maxWidth: '2560px',
  minWidth: '375px',
});

const ContentsBox = styled(Box)({
  padding: '1%',
});

/* 振り返り画面 */
const LookbackView = () => {
  /* 日付設定 */
  const now = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(now);
  const prevDate = new Date(currentDate);
  prevDate.setDate(currentDate.getDate() - 7);
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
        `${
          import.meta.env.VITE_APP_API_URL
        }/achievement/weekly?userId=${uid}&date=${`${currentDate.getFullYear()}/${String(
          currentDate.getMonth() + 1,
        ).padStart(2, '0')}/${String(currentDate.getDate()).padStart(
          2,
          '0',
        )} `}`,
      ).json();
      const achievements = response.result;
      setAchievementList(achievements);
      const achievementMap = getTotal(response.result);
      setAchievementMap(achievementMap);
    };
    void fetchAchievement();
  }, [uid, currentDate]);

  return (
    <BodyBox>
      <ContentsBox>
        <CustomAppBar />
      </ContentsBox>

      <ContentsBox>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {achievementMap && (
              <AchievementGraph achievementMap={achievementMap} />
            )}
          </Grid>
          <br />
          <Grid item xs={3.5}>
            <WeeklyButton
              title="前の週"
              img={prevButton}
              currentDate={currentDate}
              change={-7}
              setCurrentDate={(newDate: Date) => setCurrentDate(newDate)}
            />
          </Grid>
          <Grid item xs={5}>
            <Card
              sx={{
                backgroundColor: 'transparent',
                backgroundImage: `url(${flame})`,
                backgroundSize: '100% 100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '8vh',
              }}
            >
              <Typography sx={{ ...bodyBigTypographyStyle }}>
                {`${String(prevDate.getMonth() + 1).padStart(2, '0')}月${String(
                  prevDate.getDate(),
                ).padStart(2, '0')}日～${String(
                  currentDate.getMonth() + 1,
                ).padStart(2, '0')}月${String(currentDate.getDate()).padStart(
                  2,
                  '0',
                )}日 `}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={3.5}>
            <WeeklyButton
              title="次の週"
              img={nextButton}
              currentDate={currentDate}
              change={7}
              setCurrentDate={(newDate: Date) => setCurrentDate(newDate)}
            />
          </Grid>
          <Grid item xs={12}>
            {achievementList && (
              <AchievementList achievementList={achievementList} />
            )}
          </Grid>
        </Grid>
      </ContentsBox>
    </BodyBox>
  );
};

export default LookbackView;
