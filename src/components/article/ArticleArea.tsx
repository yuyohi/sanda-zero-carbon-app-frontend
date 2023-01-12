import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import ky from 'ky';
import { useQuery } from 'react-query';
import Response from '../../utils/response';
import { Article } from '../../utils/TypeDefinition';
import ArticleListView from './ArticleListView';

const useArticle = () =>
  // 記事の取得
  useQuery(['article'], async () => {
    const response: Response<Array<Article>> = await ky(
      `${import.meta.env.VITE_APP_API_URL}/article/ogp`,
    ).json(); // APIをたたく

    return response.result;
  });

const ArticleArea = () => {
  const { data, isLoading } = useArticle();

  const articleList = data as Array<Article>;

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ backgroundColor: '#F2F2F2' }}>
      <CardHeader
        title="おしらせ"
        titleTypographyProps={{
          fontFamily: ['Yusei Magic', 'sans-serif'].join(','),
          fontSize: { xs: '1.2em', md: '1.5em', lg: '2.0em' },
          marginLeft: '1%',
        }}
        sx={{ backgroundColor: '#FFFF64' }}
      />
      <CardContent>
        {articleList.map((article) => (
          <ArticleListView article={article} />
        ))}
      </CardContent>
    </Card>
  );
};

export default ArticleArea;
