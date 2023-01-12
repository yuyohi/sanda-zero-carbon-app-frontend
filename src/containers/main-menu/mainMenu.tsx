import { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, styled } from '@mui/material';
import TotalCondition from './totalCondition';
import Map from './map';
import MapNavigation from './mapNavigation';
import LevelStatus from './levelStatus';
import CustomAppBar from '../../components/customAppBar';

const BodyBox = styled(Box)({
  padding: '2%',
  width: '100vw',
  maxWidth: '2560px',
  minWidth: '375px',
});

const ContentsBox = styled(Box)({
  padding: '1%',
});

const MainMenu: FC = () => (
  <BodyBox>
    <ContentsBox>
      <CustomAppBar />
    </ContentsBox>
    <Grid container spacing={4}>
      <Grid item xs={1}>
        <span />
      </Grid>
      <Grid item xs={2.5}>
        <LevelStatus />
      </Grid>
      <Grid item xs={0.5}>
        <span />
      </Grid>
    </Grid>
    <Container
      sx={{
        height: { xs: '30vh', sm: '50vh' },
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <Map />
    </Container>
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '5%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: 20 }} />
      <TotalCondition />
      <div style={{ flexGrow: 1 }} />
      <Box>
        <div style={{ height: 100 }} />
        <MapNavigation />
      </Box>
      <div style={{ width: 10 }} />
    </Box>
  </BodyBox>
);

export default MainMenu;
