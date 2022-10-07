import { Button, Card, Grid } from '@mui/material';
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';

const weekday = ['日', '月', '火', '水', '木', '金', '土'];

type TotalStatus = { co2: number; point: number; cost: number };

const AchievementGraph = (props: {
  achievementMap: Map<number, TotalStatus>;
}) => {
  const { achievementMap } = props;
  const dates = Array.from(achievementMap.keys());
  const data = dates.map((date) => ({
      name: weekday[date],
      value: achievementMap.get(date)?.point,
    }));
  console.log(data);

  return (
    <>
      <br />
      <Grid container spacing={1} sx={{ width: '100vw' }}>
        <Grid item xs={4}>
          <Button variant="contained" style={{ width: '30vw' }}>
            ポイント
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="success" style={{ width: '30vw' }}>
            CO2
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="warning" style={{ width: '30vw' }}>
            金額{' '}
          </Button>
        </Grid>
      </Grid>
      <br />
      <Card sx={{ width: '100vw' }}>
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart data={data}>
            <Bar dataKey="value" fill="#8884d8" label={{ position: 'top' }} />
            <XAxis dataKey="name" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default AchievementGraph;
