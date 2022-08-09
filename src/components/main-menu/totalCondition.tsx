import { FC } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

type Condition = {
  co2Reduction: number;
};

const TotalCondition: FC<Condition> = ({ co2Reduction }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Card sx={{ padding: 2 }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" component="h5">
            ユーザの今週の
            <br />
            CO2削減量の合計
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" component="h3">
            {co2Reduction} kg
          </Typography>
        </Grid>
      </Grid>
    </Card>
  </Box>
);

export default TotalCondition;
