import { FC } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import flame2 from '../../assets/cloud.png';

export type Period = '今週' | '全期間';
export type ReductionCondition = {
  co2Reduction: number;
  costReduction: number;
};

export type ConditionProp = {
  period: Period;
  reduction?: ReductionCondition;
  targetValue: number;
  onClick: () => void;
};

const TotalCondition: FC<ConditionProp> = ({
  reduction,
  period,
  targetValue,
  onClick,
}) => (
  <Box
    sx={{ textAlign: 'center', width: { sm: '30%', xs: '50%' } }}
    onClick={onClick}
  >
    <Card
      sx={{
        padding: 3,
        backgroundColor: 'transparent',
        backgroundImage: `url(${flame2})`,
        backgroundSize: '100% 112%',
        boxShadow: 'none',
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <span style={{ height: '30px', display: 'block' }} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontFamily: ['Yusei Magic', 'sans-serif'].join(','),
              fontSize: { xs: '0.8em', md: '1.0em', lg: '1.2em' },
            }}
          >
            CO2削減量
            <br />
            {period}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h4"
            sx={{
              fontFamily: ['Yusei Magic', 'sans-serif'].join(','),
              fontSize: { xs: '1.3em', md: '1.5em', lg: '1.7em' },
            }}
          >
            {reduction ? Math.round(reduction.co2Reduction * 100) / 100 : '0'}
            kg
          </Typography>
        </Grid>
      </Grid>
    </Card>
    <Typography
      sx={{
        fontFamily: ['Yusei Magic', 'sans-serif'].join(','),
        fontSize: { xs: '1.0em', md: '1.2em', lg: '1.5em' },
      }}
    >
      今月の目標: {targetValue}kg
    </Typography>
  </Box>
);

export default TotalCondition;
