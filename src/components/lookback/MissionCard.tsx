import { Card } from '@mui/material';
import React, { FC } from 'react';

type Mission = {
  title: string;
  point: number;
};

const MissionCard: FC<Mission> = ({ title, point }) => (
  <Card sx={{ backgroundColor: 'lightblue' }}>
    {title} {point}pt
  </Card>
);

export default MissionCard;
