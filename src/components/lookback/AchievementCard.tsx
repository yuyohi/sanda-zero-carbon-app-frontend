import { Card } from '@mui/material';
import { format } from 'date-fns';
import React, { FC } from 'react';

export type Achievement = {
  date: Date;
  title: string;
  point: number;
};

const AchievementCard: FC<Achievement> = ({ date, title, point }) => (
  <Card sx={{ backgroundColor: 'lightblue' }}>
    <>
      {format(date, 'MM-dd HH:mm')} {title} {point}pt
    </>
  </Card>
);

export default AchievementCard;
