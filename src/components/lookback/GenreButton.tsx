import { Button, Grid } from '@mui/material';
import React, { FC } from 'react';

const GenreButton: FC = () => (
  <Grid container spacing={1} sx={{ width: '100vw' }}>
    <Grid item xs={4}>
      <Button variant="contained" style={{ width: '30vw' }}>
        ポイント
      </Button>
    </Grid>
    <Grid item xs={4}>
      <Button variant="contained" color="success" style={{ width: '30vw' }}>
        {' '}
        CO2{' '}
      </Button>
    </Grid>
    <Grid item xs={4}>
      <Button variant="contained" color="warning" style={{ width: '30vw' }}>
        {' '}
        金額{' '}
      </Button>
    </Grid>
  </Grid>
);

export default GenreButton;
