import { FC } from 'react';
import Box from '@mui/material/Box';
import { Container, styled } from '@mui/material';
import TotalCondition from './totalCondition';
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
    <Container sx={{ height: '50vh', alignItems: 'center', display: 'flex' }}>
      <Map />
    </Container>
    <Box
      sx={{
        display: 'flex',
        left: 0,
        right: 0,
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
