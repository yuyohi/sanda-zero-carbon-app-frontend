/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Box, Card, Stack } from '@mui/material';

const level = 37;
const levelupLate = 150;
const CircularLevelView = (
  props: CircularProgressProps & { value: number },
) => {
  const pointRatio = Math.round((props.value / levelupLate) * 100);

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
        <CircularProgress variant="determinate" {...props} value={pointRatio} />
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
          >{`${props.value} / ${levelupLate} Pt`}</Typography>

          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${pointRatio}%`}</Typography>
        </Stack>
      </Box>
    </Card>
  );
};

export default CircularLevelView;
