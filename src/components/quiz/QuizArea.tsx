import { Card, CardContent, CardHeader } from '@mui/material';
import { useState } from 'react';
import CustomRadioButton from './CustomRadioButton';
import answerdButton from '../../assets/quiz_category_button_1.png';
import notCorrectButton from '../../assets/quiz_category_button_2.png';
import correctButton from '../../assets/quiz_category_button_3.png';
import QuizListView from './QuizListView';
import { CategorizeQuiz, QuizCategory } from '../../utils/TypeDefinition';

const QuizArea = (props: { quizList: Array<CategorizeQuiz> }) => {
  const { quizList } = props;

  const [quizCategory, setQuizCategory] = useState<QuizCategory>('unAnswered');

  const showQuizList: CategorizeQuiz | undefined = quizList.find(
    (cQuizList) => cQuizList.category === quizCategory,
  );

  return (
    <Card sx={{ width: { xs: 200, md: 780, lg: 990 }, m: '1rem' }}>
      <CardHeader title="クイズ" />
      <CardContent>
        <>
          <CustomRadioButton
            title="unAnswerd"
            img={answerdButton}
            quizCategory="unAnswered"
            setShowQuizCategory={setQuizCategory}
          />
          <CustomRadioButton
            title="notCorrect"
            img={notCorrectButton}
            quizCategory="notCorrect"
            setShowQuizCategory={setQuizCategory}
          />
          <CustomRadioButton
            title="correct"
            img={correctButton}
            quizCategory="correct"
            setShowQuizCategory={setQuizCategory}
          />
        </>
        {showQuizList && <QuizListView quizList={showQuizList?.quiz} />}
      </CardContent>
    </Card>
  );
};

export default QuizArea;
