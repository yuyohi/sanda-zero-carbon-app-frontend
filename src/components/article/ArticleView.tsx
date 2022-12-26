import { Box, Stack } from '@mui/material';
import { styled } from '@mui/system';

import CustomAppBar from '../customAppBar';
import ArticleArea from './ArticleArea';
import ImportantArticleArea from './ImportantArticleArea';

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
      <ContentsBox>
        <ImportantArticleArea />
      </ContentsBox>
      <ContentsBox>
        <ArticleArea />
      </ContentsBox>
    </Stack>
  </BodyBox>
);
export default ArticleView;
