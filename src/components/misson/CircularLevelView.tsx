/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Box, Card, Stack } from '@mui/material';
import { UserLevelStatus } from './TypeDefinition';

const CircularLevelView = (props: { userLevelStatus: UserLevelStatus }) => {
  const { totalPoint, level, levelRate, nextLevelPercentage } =
    props.userLevelStatus;

  return (
    <Card
      sx={{
        height: '100%',
        backgroundColor: '#ffffff',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          m: '0.5rem',
        }}
      >
        <CircularProgress variant="determinate" value={nextLevelPercentage} />
      </Box>

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={2}>
          <Typography>{`Level :${level}`}</Typography>

          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${
            levelRate * (nextLevelPercentage * 0.01)
          } / ${levelRate} Pt`}</Typography>

          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${nextLevelPercentage}%`}</Typography>
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`累計ポイント: ${totalPoint}Pt`}</Typography>
        </Stack>
      </Box>
    </Card>
  );
};

export default CircularLevelView;
