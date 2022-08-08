import { FC } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

type Condition = {
  co2Reduction: number;
};
const TotalCondition: FC<Condition> = ({ co2Reduction }) => (
  <Card sx={{ padding: 2 }}>
    <Typography variant="h5" component="h5">
      ユーザの今週の
      <br />
      CO2削減量の合計
    </Typography>
    <Typography variant="h3" component="h3">
      {co2Reduction} kg
    </Typography>
  </Card>
);

export default TotalCondition;
