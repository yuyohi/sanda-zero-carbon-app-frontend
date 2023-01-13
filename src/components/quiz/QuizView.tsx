import { Box, Stack } from '@mui/material';
import { styled } from '@mui/system';

import CustomAppBar from '../customAppBar';
import QuizArea from './QuizArea';

const BodyBox = styled(Box)({
  padding: '2%',
  width: '100vw',
  maxWidth: '1440px',
  minWidth: '375px',
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
        <QuizArea />
      </ContentsBox>
    </Stack>
  </BodyBox>
);
export default QuizView;
