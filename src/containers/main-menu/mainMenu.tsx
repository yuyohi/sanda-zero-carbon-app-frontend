import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TotalCondition from './totalCondition';
import LevelStatus from './levelStatus';
import Map from './map';
import MapNavigation from './mapNavigation';
import CustomAppBar from '../../components/customAppBar';

const MainMenu: FC = () => (
  <Box sx={{ width: '100vw' }}>
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <span style={{ height: 20, display: 'block' }} />
      <Grid container spacing={4}>
        <Grid item xs={0.5}>
          <span />
        </Grid>
        <Grid item xs={2.5}>
          <LevelStatus />
        </Grid>
        <Grid item xs={8.5}>
          <Box alignItems="center">
            <CustomAppBar />
          </Box>
        </Grid>
        <Grid item xs={0.5}>
          <span />
        </Grid>
      </Grid>
    </Box>
    <Container sx={{ textAlign: 'center' }}>
      <Map />
    </Container>
    <Box
      sx={{
        display: 'flex',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: '10vh',
      }}
    >
      <div style={{ width: 10 }} />
      <TotalCondition />
      <div style={{ flexGrow: 1 }} />
      <MapNavigation />
      <div style={{ width: 10 }} />
    </Box>
  </Box>
);

export default MainMenu;
