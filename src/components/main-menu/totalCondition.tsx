import { FC } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export type Period = '今週' | '全期間';
export type ReductionCondition = {
  co2Reduction: number;
  costReduction: number;
};

export type ConditionProp = {
  period: Period;
  reduction?: ReductionCondition;
  onClick: () => void;
};

const TotalCondition: FC<ConditionProp> = ({ reduction, period, onClick }) => (
  <Box sx={{ textAlign: 'center' }} onClick={onClick}>
    <Card sx={{ padding: 2 }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" component="h5">
            ユーザの{period}の
            <br />
            CO2削減量の合計
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" component="h3">
            {reduction?.co2Reduction} kg
          </Typography>
        </Grid>
      </Grid>
    </Card>
  </Box>
);

export default TotalCondition;
