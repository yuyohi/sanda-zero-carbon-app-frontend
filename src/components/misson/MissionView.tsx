/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import CircularLevelView from './CircularLevelView';
import DailyLimitPoint from './DailyLimitPoint';
import DailyMisson from './DailyMissionList';

const MissionView = () => (
  <Container
    sx={{
      width: '100vw',
      m: '1rem',
      position: 'fixed',
      top: '1rem',
      left: '0',
      right: '0',
    }}
  >
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5.9} sx={{ m: '0.1rem', mb: '0.5rem' }}>
        <CircularLevelView variant="determinate" value={80} size="10rem" />
      </Grid>
      <Grid item xs={12} sm={5.9} sx={{ m: '0.1rem', mb: '0.5rem' }}>
        <DailyLimitPoint variant="determinate" value={80} />
      </Grid>
    </Grid>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DailyMisson />
      </Grid>
    </Grid>
  </Container>
);

export default MissionView;
