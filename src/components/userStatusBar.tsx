/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import ky from 'ky';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import LiquidFillGauge from 'react-liquid-gauge';
import { UserDto, UserLevelStatus } from '../utils/TypeDefinition';

import Response from '../utils/response';

import userState from '../atoms/userAtom';

const StatusBarBox = styled(Box)({
  backgroundColor: 'transparent',
  width: '150px',
  position: 'absolute',
  top: '-40px',
  right: '-40px',
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

  const { data, isLoading } = useLevelStatus(uid);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  const { level, levelRate, nextLevelPercentage } = data as UserLevelStatus;

  return (
    <StatusBarBox>
      <Box
        sx={{
          width: 150,
          height: 150,
          borderRadius: 50,
          backgroundColor: '#ffffff',
          position: 'absolute',
          zIndex: -1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '150px', display: 'block', textAlign: 'center' }}>
          <Typography sx={{ fontSize: 20 }}>Lv.{level}</Typography>
          <Typography sx={{ fontSize: 20 }}>{uid}</Typography>
          <Typography sx={{ fontSize: 20 }}>{40}%</Typography>
        </Box>
      </Box>
      <LiquidFillGauge
        width={150}
        height={150}
        value={40}
        textOffsetY={40}
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
