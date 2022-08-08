import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TotalCondition from './totalCondition';
import LevelView from './levelView';
import ArticleView from './articleView';
import Map from './map';

const MainMenu: FC = () => {
  const articles = [
    {
      title: 'test_1',
      date: new Date(2022, 8, 7, 10, 13),
    },
    {
      title: 'test_2',
      date: new Date(2022, 8, 6, 10, 13),
    },
  ];

  return (
    <Box sx={{ width: '100vw' }}>
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <span style={{ height: 10, display: 'block' }} />
        <Grid container spacing={4}>
          <Grid item xs={0.5}>
            <span />
          </Grid>
          <Grid item xs={2.5}>
            <LevelView level={49} expProgress={60} />
          </Grid>
          <Grid item xs={8.5}>
            <Box alignItems="center">
              <ArticleView articles={articles} />
            </Box>
          </Grid>
          <Grid item xs={0.5}>
            <span />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Map />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <div style={{ width: 10 }} />
        <TotalCondition co2Reduction={30} />
        <div style={{ flexGrow: 1 }} />
      </Box>
    </Box>
  );
};

export default MainMenu;
