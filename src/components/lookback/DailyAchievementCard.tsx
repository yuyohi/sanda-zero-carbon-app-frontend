import { CardContent, Grid } from '@mui/material';
import { FC } from 'react';
import AchievementCard from './AchievementCard';

type Achievement = {
  date: Date;
  title: string;
  point: number;
};

export type DailyAchievements = {
  dailyAchievements: Achievement[];
};

const DailyAchievementCard: FC<DailyAchievements> = ({ dailyAchievements }) => (
  <CardContent sx={{ backgroundColor: 'lightcyan' }}>
    <Grid container spacing={1}>
      {dailyAchievements.map((achievements) => (
        <Grid item xs={12}>
          <AchievementCard
            date={achievements.date}
            title={achievements.title}
            point={achievements.point}
          />
        </Grid>
      ))}
    </Grid>
  </CardContent>
);

export default DailyAchievementCard;
