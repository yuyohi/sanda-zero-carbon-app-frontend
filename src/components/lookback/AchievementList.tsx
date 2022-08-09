import { Card, CardHeader } from '@mui/material';
import { FC } from 'react';
import DailyAchievementCard from './DailyAchievementCard';

type Achievement = {
  date: Date;
  title: string;
  point: number;
};

type Achievements = {
  achievements: Achievement[];
};

const AchievementList: FC<Achievements> = ({ achievements }) => (
    <Card sx={{ width: '100vw' }}>
      <Card sx={{ width: '100vw' }}>
        <>
          <CardHeader
            title="振り返りリスト"
            sx={{ backgroundColor: 'lightcyan' }}
          />
          <DailyAchievementCard dailyAchievements={achievements} />
        </>
      </Card>
      <br />
    </Card>
  );

export default AchievementList;
