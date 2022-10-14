import { Card, Container, Button, Grid, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Quiz } from '../../utils/TypeDefinition';

const AnswerQuizView = (props: {
  quiz: Quiz;
  setCurrentQuiz: Dispatch<SetStateAction<Quiz | undefined>>;
}) => {
  const { quiz, setCurrentQuiz } = props;

  return (
    <Container>
      <Typography>
        Question#{quiz.quizId}: {quiz.title}
      </Typography>
      <Typography>{quiz.quizSentence}</Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Card>
            <Typography>{quiz.ans1}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <Typography>{quiz.ans2}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <Typography>{quiz.ans3}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <Typography>{quiz.ans4}</Typography>
          </Card>
        </Grid>
      </Grid>
      <Button onClick={() => setCurrentQuiz(undefined)}>リストに戻る</Button>
    </Container>
  );
};

export default AnswerQuizView;
