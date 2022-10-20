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
  useQuery([uid, category, 'quiz'], async () => {
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
    <Card sx={{ width: { xs: 200, md: 780, lg: 990 }, m: '1rem' }}>
      <CardHeader title="クイズ" />
      <CardContent>
        {!currentQuiz && (
          <>
            <CustomRadioButton
              title="unAnswerd"
              img={answerdButton}
              quizCategory="unanswer"
              setShowQuizCategory={setQuizCategory}
            />
            <CustomRadioButton
              title="notCorrect"
              img={notCorrectButton}
              quizCategory="incorrect"
              setShowQuizCategory={setQuizCategory}
            />
            <CustomRadioButton
              title="correct"
              img={correctButton}
              quizCategory="correct"
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
