import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import React, { FC } from 'react';
import MissionCard from './MissionCard';

type Weekly = {
  date: Date;
};

const MissionList: FC<Weekly> = () => (
  <Card sx={{ width: '100vw' }}>
    <CardHeader title="8月9日" sx={{ backgroundColor: 'lightcyan' }} />
    <CardContent sx={{ backgroundColor: 'lightcyan' }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <MissionCard title="エアコンの温度を１度下げる" point={20} />
        </Grid>
        <Grid item xs={12}>
          <MissionCard title="シャワーを出しっぱなしにしない" point={20} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default MissionList;
