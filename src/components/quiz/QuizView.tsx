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
  UserDailyStatus,
  UserDto,
  UserLevelStatus,
} from '../../utils/TypeDefinition';
import QuizArea from './QuizArea';

const QuizView = () => {
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
        `http://localhost:18080/api/user?userId=${uid}`,
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
        `http://localhost:18080/api/user/daily?userId=${uid}`,
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

        <QuizArea />
      </Grid>
    </Container>
  );
};

export default QuizView;
