import { styled } from '@mui/system';
import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import ky from 'ky';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { UserDto, UserLevelStatus } from '../utils/TypeDefinition';

import Response from '../utils/response';
import circleImg from '../assets/background_circle.png';
import circleImg2 from '../assets/background_circle2.png';
import {
  bodySmallTypographyStyle,
  bodyTypographyStyle,
} from '../utils/customStyles';
import userState from '../atoms/userAtom';
import DailyLimitPoint from './mission/DailyLimitPoint';

const StatusBarBox = styled(Box)({
  aspectRatio: '10 / 2',
  display: 'flex',
  padding: '2%',
  backgroundColor: '#F4FFD3',
  outline: 'dashed 0.1em green',
  outlineOffset: '-0.5em',
  boxShadow: '0px 0px 0px 0.01em',
  borderRadius: '0.5em',
  width: '100%',
});

const LevelBox = styled(Box)({
  backgroundImage: `url(${circleImg})`,
  backgroundSize: '100% 100%',
  aspectRatio: '1 / 1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const UserNameBox = styled(Box)({
  backgroundImage: `url(${circleImg2})`,
  backgroundSize: '100% 100%',
  aspectRatio: '1 / 1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const LevelBarBox = styled(Box)({
  width: '50%',
  height: '80%',
  marginLeft: '5%',
});

// ユーザレベルステータス取得用カスタムフック
const useLevelStatus = (uid: string) =>
  useQuery(['user', uid, 'level'], async () => {
    const response: Response<UserDto> = await ky(
      `${import.meta.env.VITE_APP_API_URL}/user?userId=${uid}`,
    ).json();

    const uLevelStatus: UserLevelStatus = {
      totalPoint: response.result.totalPoint,
      level: response.result.level,
      levelRate: response.result.levelRate,
      nextLevelPercentage: response.result.nextLevelPercentage,
    };

    return uLevelStatus;
  });

const UserStatusBar = () => {
  const uid: string = useRecoilValue(userState);

  const { data, isLoading } = useLevelStatus(uid);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  const { levelRate, nextLevelPercentage } = data as UserLevelStatus;

  return (
    <StatusBarBox>
      <LevelBox>
        <Typography sx={{ ...bodyTypographyStyle }}> Level: 5</Typography>
      </LevelBox>
      <UserNameBox>
        <Stack sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ ...bodyTypographyStyle }}>ユーザ名</Typography>
          <Typography sx={{ ...bodyTypographyStyle }}>○○○○</Typography>
        </Stack>
      </UserNameBox>
      <LevelBarBox>
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ ...bodyTypographyStyle }}>
            次のレベルまで
          </Typography>
          <LinearProgress
            variant="determinate"
            value={nextLevelPercentage * 100}
          />
          <Typography sx={{ ...bodySmallTypographyStyle }}>
            {levelRate - levelRate * nextLevelPercentage} ポイント
          </Typography>
          <DailyLimitPoint />
        </Stack>
      </LevelBarBox>
    </StatusBarBox>
  );
};

export default UserStatusBar;
