import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

export type Status = {
  userId?: string;
  level?: number;
  expProgress?: number;
};

const LevelView: FC<Status> = ({ level, expProgress, userId }) => (
  <Box>
    <Typography
      variant="h3"
      component="h3"
      sx={{
        fontSize: { xs: '1.5em', md: '3em', lg: '4em' },
        fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
      }}
    >
      Lv. {level}
    </Typography>
    <LinearProgress variant="determinate" value={expProgress} />
    <Typography
      variant="h5"
      component="h5"
      height="1em"
      width="140px"
      fontSize="20px"
      sx={{
        textAlign: 'center',
        margin: '10px',
        fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
      }}
    >
      {userId}
    </Typography>
  </Box>
);

export default LevelView;
