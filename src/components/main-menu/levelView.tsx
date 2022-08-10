import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

export type Status = {
  level?: number;
  expProgress?: number;
};

const LevelView: FC<Status> = ({ level, expProgress }) => (
  <Box>
    <Typography variant="h3" component="h3">
      Lv. {level}
    </Typography>
    <LinearProgress variant="determinate" value={expProgress} />
  </Box>
);

export default LevelView;
