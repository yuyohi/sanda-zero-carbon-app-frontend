import { Box, Stack } from '@mui/material';

import { styled } from '@mui/system';

import DailyMissionList from './DailyMissionList';
import MissionList from './MissonList';

import CustomAppBar from '../customAppBar';
import UserStatusBar from '../userStatusBar';

const BodyBox = styled(Box)({
  padding: '2%',
  width: '100vw',
  maxWidth: '2560px',
  minWidth: '375px',
});

const ContentsBox = styled(Box)({
  padding: '1%',
});

const MissionView = () => (
  <BodyBox>
    <Stack>
      <ContentsBox>
        <CustomAppBar />
      </ContentsBox>
      <ContentsBox>
        <UserStatusBar />
      </ContentsBox>
      <ContentsBox>
        <DailyMissionList />
      </ContentsBox>
      <ContentsBox>
        <MissionList />
      </ContentsBox>
    </Stack>
  </BodyBox>
);

export default MissionView;
