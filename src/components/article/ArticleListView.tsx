import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  bodyArticleBigTypographyStyle,
  bodyArticleSmallTypographyStyle,
  titleTypographyStyle,
} from '../../utils/customStyles';
import { Article } from '../../utils/TypeDefinition';

const ArticleReadButton = styled(Button)({
  backgroundColor: '#F79428',
  outlineOffset: '-0.3em',
  borderRadius: '0.5em',
  margin: '1%',
  padding: '0.1%',
  aspectRatio: '3 / 1',
  width: '100%',
});

const ArticleCard = styled(Box)({
  outline: 'dashed 0.1em orange',
  outlineOffset: '-0.3em',
  borderRadius: '0.5em',
  backgroundColor: '#fffcd2',
  padding: '2%',
  aspectRatio: '3 / 1',
  width: '100%',
});

const ArticleText = styled(Typography)({
  overflow: 'hidden',
  color: 'black',
  textAlign: 'left',
  height: '3.2em',
  lineHeight: 1.6,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
});

const ArticleListView = (props: { article: Article }) => {
  const { article } = props;

  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(
    null,
  );

  const handleCloseAchieve = () => {
    setSelectedArticle(null);
  };

  const handleClickAchieve = () => {
    setSelectedArticle(article);
  };

  return (
    <>
      <ArticleReadButton onClick={() => handleClickAchieve()}>
        <ArticleCard>
          <Grid
            container
            spacing={2}
            xs={12}
            key={article.title}
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center', // 上下中央寄せ
              justifyContent: 'space-between', // 左右中央寄せ
            }}
          >
            <Grid item xs={4.5}>
              <img
                src={article.thumbnailSource}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                }}
                alt={article.title}
              />
            </Grid>

            <Grid item xs={7.5}>
              <ArticleText
                sx={{
                  ...titleTypographyStyle,
                }}
              >
                {article.title}
              </ArticleText>
              <Divider />
              <Typography
                sx={{
                  ...bodyArticleSmallTypographyStyle,
                  display: 'flex',
                }}
              >
                {article.postedAt.toString().split('T')[0]}
              </Typography>
              <ArticleText sx={{ ...bodyArticleBigTypographyStyle }}>
                {article.description}
              </ArticleText>
            </Grid>
          </Grid>
        </ArticleCard>
      </ArticleReadButton>

      <Typography
        sx={{
          ...bodyArticleBigTypographyStyle,
          display: 'flex',
          justifyContent: 'right',
        }}
      >
        <Dialog open={!!selectedArticle} onClose={handleCloseAchieve}>
          <DialogTitle>確認</DialogTitle>
          <DialogContent>
            <DialogContentText>
              外部サイトへ飛びますが、よろしいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAchieve} color="primary">
              キャンセル
            </Button>
            <Button
              onClick={() => {
                if (selectedArticle) {
                  const { url } = selectedArticle;
                  window.open(url, '_blank');
                  setSelectedArticle(null);
                }
              }}
              color="primary"
              autoFocus
            >
              はい
            </Button>
          </DialogActions>
        </Dialog>
      </Typography>
    </>
  );
};

export default ArticleListView;
