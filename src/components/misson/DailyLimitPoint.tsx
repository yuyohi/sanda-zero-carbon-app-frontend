/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import Card from '@mui/material/Card';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import runningKippy from '../../assets/running_kippy.png';

const DailyLimitPoint = (props: LinearProgressProps & { value: number }) => (
  <Card
    sx={{ position: 'relative', height: '100%', backgroundColor: '#ffffff' }}
  >
    <Grid
      container
      direction="row"
      alignItems="stretch"
      justifyContent="center"
      spacing={1}
      sx={{
        mt: '0.3rem',
      }}
    >
      <Grid item xs={8}>
        <Grid
          container
          direction="row"
          alignItems="stretch"
          justifyContent="center"
          spacing={1}
          sx={{
            mt: '1rem',
          }}
        >
          <Grid item xs={12}>
            <Typography>本日の獲得ポイント</Typography>
          </Grid>
          <Grid item xs={12}>
            <LinearProgress
              variant="determinate"
              {...props}
              sx={{ width: 'auto' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >{`${Math.round(props.value)} / 100 Pt`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <img src={runningKippy} alt="runningkippy" width="200" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Card>
);

export default DailyLimitPoint;
