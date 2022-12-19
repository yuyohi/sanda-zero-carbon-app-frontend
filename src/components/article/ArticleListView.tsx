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
  bodyArticleTypographyStyle,
  titleTypographyStyle,
} from '../../utils/customStyles';
import { Article } from '../../utils/TypeDefinition';

const ArticleCard = styled(Box)({
  outline: 'dashed 0.1em orange',
  outlineOffset: '-0.3em',
  borderRadius: '0.5em',
  backgroundColor: '#fffcd2',
  padding: '2%',
  width: '100%',
});

const ArticleReadButton = styled('button')({
  borderRadius: '5%',
  backgroundColor: '#F79428',
  borderTop: '4px solid #C78B5D',
  borderRight: '4px solid #946746',
  borderBottom: '4px solid #946746',
  borderLeft: '4px solid #C78B5D',
  padding: '1%',
  margin: '1%',
  width: '15%',
  aspectRatio: '4 / 1',
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
      <ArticleCard>
        <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item xs={4} sm={4}>
            <img
              src={article.thumbnailSource}
              width="100%"
              alt={article.title}
            />
          </Grid>

          <Grid item xs={7.5} sm={7.5}>
            <Typography
              sx={{
                ...titleTypographyStyle,
                display: 'flex',
                justifyContent: 'left',
              }}
            >
              {article.title}
            </Typography>
            <Divider />
            <Typography
              sx={{
                ...bodyArticleSmallTypographyStyle,
                display: 'flex',
                justifyContent: 'left',
              }}
            >
              {article.postedAt.toString().split('T')[0]}
            </Typography>
            <Typography
              sx={{
                ...bodyArticleBigTypographyStyle,
                display: 'flex',
                justifyContent: 'left',
              }}
            >
              {article.description}
            </Typography>

            <Typography
              sx={{
                ...bodyArticleBigTypographyStyle,
                display: 'flex',
                justifyContent: 'right',
              }}
            >
              <ArticleReadButton onClick={() => handleClickAchieve(article)}>
                <Typography sx={{ ...bodyArticleTypographyStyle }}>
                  読む
                </Typography>
              </ArticleReadButton>

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
        </Grid>
      </ArticleCard>
    </Grid>
  );
};

export default ArticleListView;
