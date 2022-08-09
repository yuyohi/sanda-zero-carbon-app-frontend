import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

const dailyMission = [
  {
    title: 'Mission1',
    dailyid: 1,
    missionId: 1,
    point: 10,
    description: 'TestMission1',
    CO2Reduction: 100,
    costReduction: 100,
    difficulty: 'easy',
  },
  {
    title: 'Mission2',
    dailyid: 2,
    missionId: 2,
    point: 20,
    description: 'TestMission2',
    CO2Reduction: 150,
    costReduction: 150,
    difficulty: 'nomal',
  },
  {
    title: 'Mission3',
    dailyid: 3,
    missionId: 3,
    point: 30,
    description: 'TestMission3',
    CO2Reduction: 200,
    costReduction: 200,
    difficulty: 'hard',
  },
];

const DailyMisson = () => {
  const theme = useTheme();

  return (
    <Card sx={{ backgroundColor: '#ffffff' }}>
      <CardHeader title="デイリーミッション" />
      <CardContent>
        <Grid container spacing={1}>
          {dailyMission.map((mission) => (
            <>
              <Grid item xs={8}>
                <Card sx={{ backgroundColor: theme.palette.primary.main }}>
                  <Typography>{mission.title}</Typography>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  size="small"
                >{`達成 [${mission.point}Pt]`}</Button>
              </Grid>
            </>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DailyMisson;
