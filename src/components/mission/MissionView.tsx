/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/material';

import CircularLevelView from './CircularLevelView';
import DailyLimitPoint from './DailyLimitPoint';
import DailyMissionList from './DailyMissionList';
import MissionList from './MissonList';

import CustomAppBar from '../customAppBar';

const MissionView = () => (
  <Container>
    <CustomAppBar />

    <Grid container spacing={1}>
      {/*
          <Grid item xs={12} md={5.9} sx={{ m: '0.1rem', mb: '0.5rem' }}>
          {userLevelStatus && (
            <CircularLevelView userLevelStatus={userLevelStatus} />
          )}
        </Grid>
        <Grid item xs={12} md={5.9} sx={{ m: '0.1rem', mb: '0.5rem' }}>
          {userDailyStatus && (
            <DailyLimitPoint userDailyStatus={userDailyStatus} />
          )}
        </Grid>
           */}
      <Box
        sx={{
          width: { xs: 100, md: 350, lg: 490 },
          height: { xs: 100, md: 266, lg: 345.7 },
        }}
      >
        <CircularLevelView />
      </Box>
      <Box
        sx={{
          width: { xs: 100, md: 350, lg: 490 },
          height: { xs: 100, md: 266, lg: 345.7 },
        }}
      >
        <DailyLimitPoint />
      </Box>

      <Grid item xs={12} sx={{ my: '0.5rem' }}>
        <DailyMissionList />
      </Grid>
      <Grid item xs={12} sx={{ my: '0.5rem' }}>
        <MissionList />
      </Grid>
    </Grid>
  </Container>
);

export default MissionView;
