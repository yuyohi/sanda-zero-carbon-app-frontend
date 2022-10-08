import { Card, Grid } from '@mui/material';
import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';
import GenreButton from './GenreButton';

const weekday = ['日', '月', '火', '水', '木', '金', '土'];

type TotalStatus = { co2: number; point: number; cost: number };

type GraphGenre = 'point' | 'co2' | 'cost';

const AchievementGraph = (props: {
  achievementMap: Map<number, TotalStatus>;
}) => {
  const { achievementMap } = props;
  const [graphGenre, setGraphGenre] = useState<GraphGenre>('point');
  const dates = Array.from(achievementMap.keys());

  let data = dates.map((date) => ({
    name: weekday[date],
    value: achievementMap.get(date)?.point,
  }));

  if (graphGenre === 'point') {
    data = dates.map((date) => ({
      name: weekday[date],
      value: achievementMap.get(date)?.point,
    }));
  } else if (graphGenre === 'co2') {
    data = dates.map((date) => ({
      name: weekday[date],
      value: achievementMap.get(date)?.co2,
    }));
  } else if (graphGenre === 'cost') {
    data = dates.map((date) => ({
      name: weekday[date],
      value: achievementMap.get(date)?.cost,
    }));
  }

  console.log(data);

  return (
    <>
      <br />
      <Grid container spacing={1} sx={{ width: '100vw' }}>
        <Grid item xs={4}>
          <GenreButton
            title="ポイント"
            graphGenre="point"
            setShowGraphGenre={setGraphGenre}
          />
        </Grid>
        <Grid item xs={4}>
          <GenreButton
            title="CO2"
            graphGenre="co2"
            setShowGraphGenre={setGraphGenre}
          />
        </Grid>
        <Grid item xs={4}>
          <GenreButton
            title="金額"
            graphGenre="cost"
            setShowGraphGenre={setGraphGenre}
          />
        </Grid>
      </Grid>
      <br />
      <Card sx={{ width: '100vw' }}>
        <ResponsiveContainer width="90%" aspect={2}>
          <BarChart data={data}>
            <Bar
              dataKey="value"
              fill="#8884d8"
              label={{ position: 'middle' }}
            />
            <XAxis dataKey="name" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default AchievementGraph;
