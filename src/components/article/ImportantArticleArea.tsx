import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import ky from 'ky';
import { useQuery } from 'react-query';
import Response from '../../utils/response';
import { Article } from '../../utils/TypeDefinition';
import ArticleListView from './ArticleListView';

const useArticle = () =>
  // 記事の取得
  useQuery(['importantArticle'], async () => {
    const response: Response<Array<Article>> = await ky(
      `${import.meta.env.VITE_APP_API_URL}/article/important`,
    ).json(); // APIをたたく

    return response.result;
  });

const ImportantArticleArea = () => {
  const { data, isLoading } = useArticle();

  const importantArticleList = data as Array<Article>;

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ backgroundColor: '#F2F2F2' }}>
      <CardHeader
        title="注目記事"
        titleTypographyProps={{
          fontFamily: ['Yusei Magic', 'sans-serif'].join(','),
          fontSize: { xs: '1.2em', md: '1.5em', lg: '2.0em' },
          marginLeft: '1%',
        }}
        sx={{ backgroundColor: '#fd963e' }}
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
          {importantArticleList.map((importantArticle) => (
            <ArticleListView article={importantArticle} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ImportantArticleArea;
