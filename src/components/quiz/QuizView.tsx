import { Box, Stack } from '@mui/material';
import { styled } from '@mui/system';

import CustomAppBar from '../customAppBar';
import UserStatusBar from '../userStatusBar';
import QuizArea from './QuizArea';

const BodyBox = styled(Box)({
  padding: '2%',
  width: '100vw',
  maxWidth: '2560px',
  minWidth: '450px',
});

const ContentsBox = styled(Box)({
  padding: '1%',
});

const QuizView = () => (
  <BodyBox>
    <Stack>
      <ContentsBox>
        <CustomAppBar />
      </ContentsBox>
      <ContentsBox>
        <UserStatusBar />
      </ContentsBox>
      <ContentsBox>
        <QuizArea />
      </ContentsBox>
    </Stack>
  </BodyBox>
);
export default QuizView;
