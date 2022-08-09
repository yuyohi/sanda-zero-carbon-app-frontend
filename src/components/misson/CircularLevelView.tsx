/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Grid } from '@mui/material';

const level = 37;
const levelupLate = 150;
const CircularLevelView = (
  props: CircularProgressProps & { value: number },
) => {
  const pointRatio = Math.round((props.value / levelupLate) * 100);

  return (
    <Card
      sx={{ position: 'relative', height: '100%', backgroundColor: '#ffffff' }}
    >
      <CircularProgress
        variant="determinate"
        {...props}
        value={pointRatio}
        sx={{ mt: '0.5rem' }}
      />
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
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>{`Level :${level}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >{`${props.value} / ${levelupLate} Pt`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >{`${pointRatio}%`}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default CircularLevelView;
