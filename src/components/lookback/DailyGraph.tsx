import { Card } from '@mui/material';
import React, { FC } from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';

const Data = [
  { name: '月', point: 30 },
  { name: '火', point: 40 },
  { name: '水', point: 50 },
  { name: '木', point: 10 },
  { name: '金', point: 0 },
  { name: '土', point: 20 },
  { name: '日', point: 30 },
];

const DailyGraph: FC = () => (
  <Card sx={{ width: '100vw' }}>
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart data={Data}>
        <Bar dataKey="point" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);

export default DailyGraph;
