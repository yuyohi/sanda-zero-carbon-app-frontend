import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import ky from 'ky';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import { UserDailyStatus } from '../../utils/TypeDefinition';
import Response from '../../utils/response';
import userState from '../../atoms/userAtom';
import {
  bodySmallTypographyStyle,
  bodyTypographyStyle,
} from '../../utils/customStyles';

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

  const dailyMissionPersentage =
    (dailyMissionPoint / dailyMaxMissionPoint) * 100;

  return (
    <>
      <Typography sx={{ ...bodyTypographyStyle }}>
        本日の獲得ポイント
      </Typography>
      <LinearProgress variant="determinate" value={dailyMissionPersentage} />
      <Typography sx={{ ...bodySmallTypographyStyle }}>
        {dailyMissionPoint} / {dailyMaxMissionPoint}
      </Typography>
    </>
  );
};

export default DailyLimitPoint;
