import { Container, Button, Grid, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { Dispatch, SetStateAction, useState } from 'react';
import ky from 'ky';
import { useQueryClient, useMutation } from 'react-query';
import { Quiz, QuizAnswer } from '../../utils/TypeDefinition';
import userState from '../../atoms/userAtom';
import Response from '../../utils/response';

type AnswerQuizPayload = {
  uid: string;
  ans: string;
  qid: number;
};

const useAnswerQuizMutation = (
  setQuizAns: Dispatch<SetStateAction<QuizAnswer | undefined>>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload: AnswerQuizPayload) => {
      const response: Response<QuizAnswer> = await ky
        .post(`${import.meta.env.VITE_APP_API_URL}/quiz/answer`, {
          json: {
            quizId: payload.qid,
            userAns: payload.ans,
            userId: payload.uid,
          },
        })
        .json();

      return response.result;
    },
    {
      onSuccess: (data) => {
        void queryClient.invalidateQueries('quiz');
        void queryClient.invalidateQueries('user');

        setQuizAns(data);
      },
    },
  );
};

const AnswerQuizView = (props: {
  quiz: Quiz;
  setCurrentQuiz: Dispatch<SetStateAction<Quiz | undefined>>;
}) => {
  const { quiz, setCurrentQuiz } = props;

  const uid: string = useRecoilValue(userState);

  const [quizAns, setQuizAns] = useState<QuizAnswer | undefined>(undefined);

  const { mutate } = useAnswerQuizMutation(setQuizAns);

  // eslint-disable-next-line no-shadow
  const onClick = (uid: string, ans: string, qid: number) => {
    mutate({ uid, ans, qid });
  };

  if (quizAns) {
    return (
      <Container>
        {quizAns.correctAns === quizAns.userAns ? (
          <Typography>正解</Typography>
        ) : (
          <Typography>ざんねん</Typography>
        )}
        <Typography>あなたの答え:{quizAns.userAns}</Typography>
        <Typography>正しい答え:{quizAns.correctAns}</Typography>
        <Typography>解説</Typography>
        <Typography>{quizAns.explaination}</Typography>
        <Button onClick={() => setCurrentQuiz(undefined)}>
          クイズ一覧に戻る
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography>
        Question#{quiz.quizId}: {quiz.title}
      </Typography>
      <Typography>{quiz.quizSentence}</Typography>
      <Grid container spacing={1}>
        {quiz.answerList.map((ans) => (
          <Grid item xs={6}>
            <Button onClick={() => onClick(uid, ans, quiz.quizId)}>
              {ans}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button onClick={() => setCurrentQuiz(undefined)}>リストに戻る</Button>
    </Container>
  );
};

export default AnswerQuizView;
