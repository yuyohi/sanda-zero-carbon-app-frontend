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

const ArticleCard = styled(Box)({
  outline: 'dashed 0.1em orange',
  outlineOffset: '-0.3em',
  borderRadius: '0.5em',
  backgroundColor: '#fffcd2',
  padding: '2%',
  height: '100%',
});

const ArticleReadButton = styled('button')({
  backgroundColor: '#F79428',
  padding: '0%',
  margin: '1%',
  aspectRatio: '3 / 1',
  justifyContent: 'center',
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
    <Grid item xs={12} key={article.title}>
      <ArticleReadButton onClick={() => handleClickAchieve()}>
        <ArticleCard
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            justify: 'center',
          }}
        >
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              justify: 'center',
            }}
          >
            <Grid item xs={3.5}>
              <img
                src={article.thumbnailSource}
                max-width="100%"
                width="100%"
                // object-fit="cover"
                max-height="100%"
                alt={article.title}
              />
            </Grid>

            <Grid item xs={7.5}>
              <Typography
                sx={{
                  ...titleTypographyStyle,
                  color: 'black',
                }}
              >
                {article.title}
              </Typography>
              <Divider />
              <Typography
                sx={{
                  ...bodyArticleSmallTypographyStyle,
                  display: 'flex',
                }}
              >
                {article.postedAt.toString().split('T')[0]}
              </Typography>
              <Typography
                sx={{
                  ...bodyArticleBigTypographyStyle,
                  color: 'black',
                }}
              >
                {article.description}
              </Typography>
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
    </Grid>
  );
};

export default ArticleListView;
