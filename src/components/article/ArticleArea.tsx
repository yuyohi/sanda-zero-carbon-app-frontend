import { Card, CardContent, CardHeader, Typography } from '@mui/material';
// import { useState } from 'react';
import ky from 'ky';
import { useQuery } from 'react-query';
// import { useRecoilValue } from 'recoil';
// import CustomRadioButton from './CustomRadioButton';
// import answerdButton from '../../assets/quiz_category_button_1.png';
// import notCorrectButton from '../../assets/quiz_category_button_2.png';
// import correctButton from '../../assets/quiz_category_button_3.png';
// import QuizListView from './QuizListView';
import { Article } from '../../utils/TypeDefinition';
import Response from '../../utils/response';
// import AnswerQuizView from './AnswerQuizView';
// import userState from '../../atoms/userAtom';
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
  // const uid: string = useRecoilValue(userState);

  //   const [quizCategory, setQuizCategory] = useState<QuizCategory>('unanswer');

  const { data, isLoading } = useArticle(); // 記事を取得してdataに格納，isLoadingはロード中にTrue

  const articleList = data as Array<Article>; // Responseから記事リストを抽出

  //   const [currentQuiz, setCurrentQuiz] = useState<Quiz | undefined>(undefined);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ backgroundColor: '#FFF' }}>
      <CardHeader
        title="記事"
        titleTypographyProps={{
          fontFamily: ['Yusei Magic', 'sans-serif'].join(','),
          fontSize: { xs: '1.2em', md: '1.5em', lg: '2.0em' },
          marginLeft: '1%',
        }}
        sx={{ backgroundColor: '#F29574' }}
      />
      <CardContent>
        <ArticleListView articleList={articleList} />
      </CardContent>
    </Card>
  );
};

export default ArticleArea;
