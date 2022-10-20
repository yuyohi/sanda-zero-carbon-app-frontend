import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import ky from 'ky';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import runningKippy from '../../assets/running_kippy.png';
import flame1 from '../../assets/flame_1.png';
import { UserDailyStatus } from '../../utils/TypeDefinition';
import Response from '../../utils/response';
import userState from '../../atoms/userAtom';

const useDailyStatus = (uid: string) =>
  useQuery(['user', uid, 'dailyPoint'], async () => {
    const response: Response<UserDailyStatus> = await ky(
      `${import.meta.env.VITE_APP_API_URL}/user/daily?userId=${uid}`,
    ).json();

    return response.result;
  });

const DailyLimitPoint = () => {
  const uid: string = useRecoilValue(userState);

  const { data, isLoading } = useDailyStatus(uid);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  const { dailyMissionPoint, dailyMaxMissionPoint } = data as UserDailyStatus;

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
              mt: { xs: '1rem', md: '4rem', lg: '6rem' },
            }}
          >
            <Grid item xs={12}>
              <Typography>本日の獲得ポイント</Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                variant="determinate"
                value={Math.round(
                  (dailyMissionPoint / dailyMaxMissionPoint) * 100,
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
                dailyMissionPoint,
              )} / ${dailyMaxMissionPoint} Pt`}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                justifyContent: 'flex-end',
                display: { xs: 'none', md: 'none', lg: 'flex' },
              }}
            >
              <img src={runningKippy} alt="runningkippy" width="150" />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                justifyContent: 'flex-end',
                display: { xs: 'none', md: 'flex', lg: 'none' },
              }}
            >
              <img src={runningKippy} alt="runningkippy" width="100" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DailyLimitPoint;
