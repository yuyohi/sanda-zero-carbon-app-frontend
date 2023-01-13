/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled } from '@mui/system';
import { Box, Typography, useMediaQuery } from '@mui/material';
import ky from 'ky';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import LiquidFillGauge from 'react-liquid-gauge';
import { UserDto, UserLevelStatus } from '../utils/TypeDefinition';

import Response from '../utils/response';

import userState from '../atoms/userAtom';
import theme from '../theme/theme';

const StatusBarBox = styled(Box)({
  backgroundColor: 'transparent',
  position: 'fixed',
  zIndex: 10,
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
  const matches: boolean = useMediaQuery(() => theme.breakpoints.up('md'));

  const { data, isLoading } = useLevelStatus(uid);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  const { level, levelRate, nextLevelPercentage } = data as UserLevelStatus;

  const circlewidth = matches ? 200 : 150;
  const fontSize = matches ? 26 : 20;

  return (
    <StatusBarBox
      sx={{
        top: { xs: '-30px' },
        right: { xs: '-30px' },
        width: circlewidth,
      }}
    >
      <Box
        sx={{
          width: circlewidth,
          height: circlewidth,
          borderRadius: 50,
          backgroundColor: '#ffffff',
          position: 'absolute',
          zIndex: -1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: 'block', textAlign: 'center' }}>
          <Typography sx={{ fontSize: { fontSize } }}>Lv.{level}</Typography>
          <Typography sx={{ fontSize: { fontSize } }}>{uid}</Typography>
          <Typography sx={{ fontSize: { fontSize } }}>{40}%</Typography>
        </Box>
      </Box>
      <LiquidFillGauge
        width={circlewidth}
        height={circlewidth}
        value={40}
        textSize={0}
        waveAnimation
        circleStyle={{ fill: '#FF8F50' }}
        waveStyle={{ fill: 'rgba(80, 255, 255, 0.4)' }}
        waveTextStyle={{ fill: 'black' }}
      />
    </StatusBarBox>
  );
};

export default UserStatusBar;
