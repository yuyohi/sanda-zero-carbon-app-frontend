import { Box, Stack } from '@mui/material';
import { styled } from '@mui/system';

import CustomAppBar from '../customAppBar';
import ArticleList from './ArticleList';

const BodyBox = styled(Box)({
  padding: '2%',
  width: '100vw',
  maxWidth: '2560px',
  minWidth: '375px',
});

const ContentsBox = styled(Box)({
  padding: '1%',
});

const ArticleView = () => (
  <BodyBox>
    <Stack>
      <ContentsBox>
        <CustomAppBar />
      </ContentsBox>
      <ContentsBox>{/* <UserStatusBar /> */}</ContentsBox>
      <ContentsBox>
        <ArticleList />
      </ContentsBox>
    </Stack>
  </BodyBox>
);
export default ArticleView;
