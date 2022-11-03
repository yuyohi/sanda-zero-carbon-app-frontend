import { Button, Grid, Typography, styled, Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { Dispatch, SetStateAction, useState } from 'react';
import ky from 'ky';
import { useQueryClient, useMutation } from 'react-query';
import { Quiz, QuizAnswer } from '../../utils/TypeDefinition';
import userState from '../../atoms/userAtom';
import Response from '../../utils/response';
import { bodyBigTypographyStyle } from '../../utils/customStyles';

type AnswerQuizPayload = {
  uid: string;
  ans: string;
  qid: number;
};

const AnswerButtonBox = styled(Box)({
  borderRadius: '5%',
  padding: '1%',
  margin: '1%',
  aspectRatio: '2 / 1',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '3px 3px 3px #666666',
});

const answerButtonColor = ['#8DF2F2', '#F2A5DE', '#74F28B', '#F5EA95'];

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
      <Box sx={{ p: '1%' }}>
        {quizAns.correctAns === quizAns.userAns ? (
          <Typography sx={{ ...bodyBigTypographyStyle, mb: '1%', pl: '1%' }}>
            正解
          </Typography>
        ) : (
          <Typography sx={{ ...bodyBigTypographyStyle, mb: '1%', pl: '1%' }}>
            ざんねん
          </Typography>
        )}
        <Typography sx={{ ...bodyBigTypographyStyle, mb: '1%' }}>
          あなたの答え:{quizAns.userAns}
        </Typography>
        <Typography sx={{ ...bodyBigTypographyStyle, mb: '1%' }}>
          正しい答え:{quizAns.correctAns}
        </Typography>
        <Typography sx={{ ...bodyBigTypographyStyle, mb: '1%', pl: '1%' }}>
          解説
        </Typography>
        <Typography sx={{ ...bodyBigTypographyStyle, mb: '1%' }}>
          {quizAns.explaination}
        </Typography>
        <Button
          onClick={() => setCurrentQuiz(undefined)}
          sx={{ ...bodyBigTypographyStyle, mb: '1%' }}
        >
          クイズ一覧に戻る
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: '1%' }}>
      <Typography sx={{ ...bodyBigTypographyStyle, mb: '1%' }}>
        Question#{quiz.quizId}: {quiz.title}
      </Typography>
      <Typography
        sx={{ ...bodyBigTypographyStyle, textAlign: 'center', mb: '1%' }}
      >
        {quiz.quizSentence}
      </Typography>
      <Grid container spacing={1} sx={{ px: '20%' }}>
        {quiz.answerList.map((ans, index) => (
          <Grid item xs={6}>
            <Button
              onClick={() => onClick(uid, ans, quiz.quizId)}
              sx={{ width: '100%' }}
            >
              <AnswerButtonBox
                sx={{ backgroundColor: answerButtonColor[index] }}
              >
                <Typography sx={{ ...bodyBigTypographyStyle }}>
                  {ans}
                </Typography>
              </AnswerButtonBox>
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={() => setCurrentQuiz(undefined)}
        sx={{ ...bodyBigTypographyStyle, mb: '1%' }}
      >
        リストに戻る
      </Button>
    </Box>
  );
};

export default AnswerQuizView;
