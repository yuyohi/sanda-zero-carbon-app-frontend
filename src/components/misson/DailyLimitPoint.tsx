/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import runningKippy from '../../assets/running_kippy.png';
import flame1 from '../../assets/flame_1.png';
import { UserDailyStatus } from './TypeDefinition';

const DailyLimitPoint = (props: { userDailyStatus: UserDailyStatus }) => {
  const { dailyTotalPoint, dailyMaxMissionPoint } = props.userDailyStatus;

  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        backgroundColor: 'transparent',
        backgroundImage: `url(${flame1})`,
        backgroundSize: '100% 100%',
        boxShadow: 'none',
      }}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
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
              mt: '6rem',
            }}
          >
            <Grid item xs={12}>
              <Typography>本日の獲得ポイント</Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                variant="determinate"
                value={Math.round(
                  (dailyTotalPoint / dailyMaxMissionPoint) * 100,
                )}
                sx={{ width: 'auto' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >{`${Math.round(
                dailyTotalPoint,
              )} / ${dailyMaxMissionPoint} Pt`}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: 'flex-end' }}>
              <img src={runningKippy} alt="runningkippy" width="150" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DailyLimitPoint;
