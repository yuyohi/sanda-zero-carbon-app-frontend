import { FC } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import flame2 from '../../assets/flame_2.png';

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
  <Box sx={{ textAlign: 'center', width: '20em' }} onClick={onClick}>
    <Card
      sx={{
        padding: 2,
        backgroundColor: 'transparent',
        backgroundImage: `url(${flame2})`,
        backgroundSize: '100% 100%',
        boxShadow: 'none',
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <span style={{ height: '40px', display: 'block' }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h5">
            ユーザの{period}の
            <br />
            CO2削減量の合計
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" component="h3">
            {reduction ? Math.round(reduction.co2Reduction * 100) / 100 : '0'}
            kg
          </Typography>
        </Grid>
      </Grid>
    </Card>
  </Box>
);

export default TotalCondition;
