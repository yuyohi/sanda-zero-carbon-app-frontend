import { Box, Container, Grid } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import ky from 'ky';
import userState from '../../atoms/userAtom';
import CustomAppBar from '../customAppBar';
import CircularLevelView from '../mission/CircularLevelView';
import DailyLimitPoint from '../mission/DailyLimitPoint';
import Response from '../../utils/response';
import {
  CategorizeQuiz,
  Quiz,
  UserDailyStatus,
  UserDto,
  UserLevelStatus,
} from '../../utils/TypeDefinition';
import QuizArea from './QuizArea';

const QuizView = () => {
  const anAnswerdQuiz: Array<Quiz> = [
    {
      quizId: 1,
      title: 'クイズ1',
      quizSentence: '問題文1',
      explain: '解説1',
      ans1: '回答1',
      ans2: '回答2',
      ans3: '回答3',
      ans4: '回答4',
      point: 1,
      tagId: 1,
    },
    {
      quizId: 2,
      title: 'クイズ2',
      quizSentence: '問題文2',
      explain: '解説2',
      ans1: '回答1',
      ans2: '回答2',
      ans3: '回答3',
      ans4: '回答4',
      point: 1,
      tagId: 2,
    },
    {
      quizId: 3,
      title: 'クイズ3',
      quizSentence: '問題文3',
      explain: '解説3',
      ans1: '回答1',
      ans2: '回答2',
      ans3: '回答3',
      ans4: '回答4',
      point: 1,
      tagId: 3,
    },
  ];

  const notCorrectQuiz: Array<Quiz> = [
    {
      quizId: 4,
      title: 'クイズ4',
      quizSentence: '問題文4',
      explain: '解説4',
      ans1: '回答1',
      ans2: '回答2',
      ans3: '回答3',
      ans4: '回答4',
      point: 1,
      tagId: 4,
    },
    {
      quizId: 5,
      title: 'クイズ5',
      quizSentence: '問題文5',
      explain: '解説5',
      ans1: '回答1',
      ans2: '回答2',
      ans3: '回答3',
      ans4: '回答4',
      point: 1,
      tagId: 5,
    },
    {
      quizId: 6,
      title: 'クイズ6',
      quizSentence: '問題文6',
      explain: '解説6',
      ans1: '回答1',
      ans2: '回答2',
      ans3: '回答3',
      ans4: '回答4',
      point: 1,
      tagId: 6,
    },
  ];

  const correctQuiz: Array<Quiz> = [
    {
      quizId: 7,
      title: 'クイズ7',
      quizSentence: '問題文7',
      explain: '解説7',
      ans1: '回答1',
      ans2: '回答2',
      ans3: '回答3',
      ans4: '回答4',
      point: 1,
      tagId: 7,
    },
    {
      quizId: 8,
      title: 'クイズ8',
      quizSentence: '問題文8',
      explain: '解説8',
      ans1: '回答1',
      ans2: '回答2',
      ans3: '回答3',
      ans4: '回答4',
      point: 1,
      tagId: 8,
    },
    {
      quizId: 9,
      title: 'クイズ9',
      quizSentence: '問題文9',
      explain: '解説9',
      ans1: '回答1',
      ans2: '回答2',
      ans3: '回答3',
      ans4: '回答4',
      point: 1,
      tagId: 9,
    },
  ];

  const quizList: Array<CategorizeQuiz> = [
    {
      category: 'unAnswered',
      quiz: anAnswerdQuiz,
    },
    {
      category: 'notCorrect',
      quiz: notCorrectQuiz,
    },
    {
      category: 'correct',
      quiz: correctQuiz,
    },
  ];

  const [userLevelStatus, setUserLevelStatus] = useState<
    UserLevelStatus | undefined
  >();
  const [userDailyStatus, setuserDailyStatus] = useState<
    UserDailyStatus | undefined
  >();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const uid: string = useRecoilValue(userState);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reloadCount, setReloadCount] = useState<number>(0);

  useEffect(() => {
    const fetchUserLevelStatus = async () => {
      const response: Response<UserDto> = await ky(
        `${import.meta.env.VITE_APP_API_URL}/api/user?userId=${uid}`,
      ).json();
      const uLevelStatus: UserLevelStatus = {
        totalPoint: response.result.totalPoint,
        level: response.result.level,
        levelRate: response.result.levelRate,
        nextLevelPercentage: response.result.nextLevelPercentage,
      };
      setUserLevelStatus(uLevelStatus);
    };

    const fetchUserDailyStatus = async () => {
      const response: Response<UserDailyStatus> = await ky(
        `${import.meta.env.VITE_APP_API_URL}/user/daily?userId=${uid}`,
      ).json();
      const uDailyStatus = response.result;
      setuserDailyStatus(uDailyStatus);
    };

    void fetchUserLevelStatus();
    void fetchUserDailyStatus();
  }, [reloadCount, uid]);

  return (
    <Container>
      <CustomAppBar />

      <Grid container spacing={1}>
        <Box
          sx={{
            width: { xs: 100, md: 350, lg: 490 },
            height: { xs: 100, md: 266, lg: 345.7 },
          }}
        >
          {userLevelStatus && (
            <CircularLevelView userLevelStatus={userLevelStatus} />
          )}
        </Box>
        <Box
          sx={{
            width: { xs: 100, md: 350, lg: 490 },
            height: { xs: 100, md: 266, lg: 345.7 },
          }}
        >
          {userDailyStatus && (
            <DailyLimitPoint userDailyStatus={userDailyStatus} />
          )}
        </Box>

        <QuizArea quizList={quizList} />
      </Grid>
    </Container>
  );
};

export default QuizView;
