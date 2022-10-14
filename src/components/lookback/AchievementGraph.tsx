import { Card, Grid } from '@mui/material';
import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';
import GenreButton from './GenreButton';
import pointButton from '../../assets/lookback_point.png';
import co2Button from '../../assets/lookback_co2.png';
import costButton from '../../assets/lookback_cost.png';

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

  return (
    <>
      <br />
      <Grid container spacing={1} sx={{ width: '100vw' }}>
        <Grid item xs={4}>
          <GenreButton
            title="ポイント"
            img={pointButton}
            graphGenre="point"
            setShowGraphGenre={setGraphGenre}
          />
        </Grid>
        <Grid item xs={4}>
          <GenreButton
            title="CO2"
            img={co2Button}
            graphGenre="co2"
            setShowGraphGenre={setGraphGenre}
          />
        </Grid>
        <Grid item xs={4}>
          <GenreButton
            title="金額"
            img={costButton}
            graphGenre="cost"
            setShowGraphGenre={setGraphGenre}
          />
        </Grid>
      </Grid>
      <br />
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart data={data}>
            <Bar
              dataKey="value"
              fill="lightblue"
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
