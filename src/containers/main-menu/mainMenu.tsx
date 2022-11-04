import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Container, styled } from '@mui/material';
import TotalCondition from './totalCondition';
import LevelStatus from './levelStatus';
import Map from './map';
import MapNavigation from './mapNavigation';
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
    <ContentsBox>
      <span style={{ height: 20, display: 'block' }} />
      <Grid container spacing={4}>
        <Grid item xs={0.5}>
          <span />
        </Grid>
        <Grid item xs={2.5}>
          <LevelStatus />
        </Grid>
        <Grid item xs={0.5}>
          <span />
        </Grid>
      </Grid>
    </ContentsBox>
    <Container sx={{ height: '100vh', alignItems: 'center', display: 'flex' }}>
      <Map />
    </Container>
    <Box
      sx={{
        display: 'flex',
        left: 0,
        right: 0,
        bottom: '5%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: 20 }} />
      <TotalCondition />
      <div style={{ flexGrow: 1 }} />
      <MapNavigation />
      <div style={{ width: 10 }} />
    </Box>
  </BodyBox>
);

export default MainMenu;
