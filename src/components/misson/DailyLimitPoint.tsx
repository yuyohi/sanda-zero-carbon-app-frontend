/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

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
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="stretch"
          justifyContent="center"
          spacing={1}
        >
          <Grid item xs={12}>
            <LinearProgress
              variant="determinate"
              {...props}
              sx={{ width: 'auto' }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="stretch"
          justifyContent="center"
          spacing={1}
        >
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >{`${Math.round(props.value)} / 100 Pt`}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Card>
);

export default DailyLimitPoint;
