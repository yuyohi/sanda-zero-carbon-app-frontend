import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useState } from 'react';
import ky from 'ky';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import CustomRadioButton from './CustomRadioButton';
import answerdButton from '../../assets/quiz_category_button_1.png';
import notCorrectButton from '../../assets/quiz_category_button_2.png';
import correctButton from '../../assets/quiz_category_button_3.png';
import QuizListView from './QuizListView';
import { QuizCategory, Quiz } from '../../utils/TypeDefinition';
import Response from '../../utils/response';
import AnswerQuizView from './AnswerQuizView';
import userState from '../../atoms/userAtom';

const useQuiz = (uid: string, category: QuizCategory) =>
  useQuery(['quiz', uid, category], async () => {
    const response: Response<Array<Quiz>> = await ky(
      `${import.meta.env.VITE_APP_API_URL}/quiz/${category}/?userId=${uid}`,
    ).json();

    return response.result;
  });

const QuizArea = () => {
  const uid: string = useRecoilValue(userState);

  const [quizCategory, setQuizCategory] = useState<QuizCategory>('unanswer');

  const { data, isLoading } = useQuiz(uid, quizCategory);

  const quizList = data as Array<Quiz>;

  const [currentQuiz, setCurrentQuiz] = useState<Quiz | undefined>(undefined);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ backgroundColor: '#FFF' }}>
      <CardHeader
        title="クイズ"
        titleTypographyProps={{
          fontFamily: ['Yusei Magic', 'sans-serif'].join(','),
          fontSize: { xs: '1.2em', md: '1.5em', lg: '2.0em' },
          marginLeft: '1%',
        }}
        sx={{ backgroundColor: '#F29574' }}
      />
      <CardContent>
        {!currentQuiz && (
          <>
            <CustomRadioButton
              title="unAnswerd"
              img={answerdButton}
              buttonQuizCategory="unanswer"
              showQuizCategory={quizCategory}
              setShowQuizCategory={setQuizCategory}
            />
            <CustomRadioButton
              title="notCorrect"
              img={notCorrectButton}
              buttonQuizCategory="incorrect"
              showQuizCategory={quizCategory}
              setShowQuizCategory={setQuizCategory}
            />
            <CustomRadioButton
              title="correct"
              img={correctButton}
              buttonQuizCategory="correct"
              showQuizCategory={quizCategory}
              setShowQuizCategory={setQuizCategory}
            />
          </>
        )}

        {!currentQuiz && quizList && (
          <QuizListView quizList={quizList} setCurrentQuiz={setCurrentQuiz} />
        )}
        {currentQuiz && (
          <AnswerQuizView quiz={currentQuiz} setCurrentQuiz={setCurrentQuiz} />
        )}
      </CardContent>
    </Card>
  );
};

export default QuizArea;
