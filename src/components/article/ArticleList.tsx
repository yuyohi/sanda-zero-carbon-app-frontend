import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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
import ky from 'ky';
import { useQuery } from 'react-query';
import Response from '../../utils/response';
import {
  bodyArticleBigTypographyStyle,
  bodyArticleSmallTypographyStyle,
  bodyArticleTypographyStyle,
  titleTypographyStyle,
} from '../../utils/customStyles';

type Article = {
  // Articleのtype定義
  articleId: number;
  title: string;
  tagId: number;
  description: string;
  postedAt: Date;
  thumbnailSource: string;
  isImportant: boolean;
  url: string;
};

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

const useArticle = () =>
  // 記事の取得
  useQuery(['article'], async () => {
    const response: Response<Array<Article>> = await ky(
      `${import.meta.env.VITE_APP_API_URL}/article/ogp`,
    ).json(); // APIをたたく

    return response.result;
  });

const ArticleList = () => {
  const { data, isLoading } = useArticle();

  const articleList = data as Array<Article>;

  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(
    null,
  );

  const handleCloseAchive = () => {
    setSelectedArticle(null);
  };

  const handleClickAchive = (article: Article) => {
    setSelectedArticle(article);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ backgroundColor: '#F2F2F2' }}>
      <CardHeader
        title="記事"
        titleTypographyProps={{
          fontFamily: ['Yusei Magic', 'sans-serif'].join(','),
          fontSize: { xs: '1.2em', md: '1.5em', lg: '2.0em' },
          marginLeft: '1%',
        }}
        sx={{ backgroundColor: '#FFFF64' }}
      />
      <CardContent>
        <Grid
          container
          spacing={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {articleList.map((article) => (
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
                      <ArticleReadButton
                        onClick={() => handleClickAchive(article)}
                      >
                        <Typography sx={{ ...bodyArticleTypographyStyle }}>
                          読む
                        </Typography>
                      </ArticleReadButton>

                      <Dialog
                        open={!!selectedArticle}
                        onClose={handleCloseAchive}
                      >
                        <DialogTitle>確認</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            外部サイトへ飛びますが、よろしいですか？
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseAchive} color="primary">
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
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ArticleList;
