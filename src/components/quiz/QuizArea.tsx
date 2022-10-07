import { Card, CardContent, CardHeader } from '@mui/material';
import { useState } from 'react';
import CustomRadioButton from './CustomRadioButton';
import answerdButton from '../../assets/quiz_category_button_1.png';
import notCorrectButton from '../../assets/quiz_category_button_2.png';
import correctButton from '../../assets/quiz_category_button_3.png';

const QuizArea = () => {
  const [quizCategory, setQuizCategory] = useState<string>('notAnswerd');

  return (
    <Card sx={{ width: { xs: 200, md: 780, lg: 990 }, m: '1rem' }}>
      <CardHeader title="クイズ" />
      <CardContent>
        <>
          <CustomRadioButton
            title="notAnswerd"
            img={answerdButton}
            quizCategory={quizCategory}
            setShowQuizCategory={setQuizCategory}
          />
          <CustomRadioButton
            title="notAnswerd"
            img={notCorrectButton}
            quizCategory={quizCategory}
            setShowQuizCategory={setQuizCategory}
          />
          <CustomRadioButton
            title="notAnswerd"
            img={correctButton}
            quizCategory={quizCategory}
            setShowQuizCategory={setQuizCategory}
          />
        </>
      </CardContent>
    </Card>
  );
};

export default QuizArea;
