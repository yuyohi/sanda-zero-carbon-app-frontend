import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import ky from 'ky';
import { useRecoilValue } from 'recoil';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import userState from '../../atoms/userAtom';
import Response from '../../utils/response';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  bodyBigTypographyStyle,
  bodyTypographyStyle,
} from '../../utils/customStyles';

type DailyMission = {
  title: string;
  dailyMissionId: number;
  missionId: number;
  point: number;
  description: string;
  co2Reduction: number;
  costReduction: number;
  difficulty: string;
  keyword: string;
};

type AchiveDailyMissionPayload = {
  uid: string;
  selectedMission: DailyMission;
};

const DailyMissionCard = styled(Box)({
  outline: 'dashed 0.1em orange',
  outlineOffset: '-0.3em',
  borderRadius: '0.5em',
  backgroundColor: '#F7C7A8',
  padding: '2%',
});

const DailyMissionAchiveButton = styled('button')({
  borderRadius: '5%',
  backgroundColor: '#F7C7A8',
  borderTop: '4px solid #C78B5D',
  borderRight: '4px solid #946746',
  borderBottom: '4px solid #946746',
  borderLeft: '4px solid #C78B5D',
  padding: '1%',
  margin: '1%',
  width: '30%',
  aspectRatio: '1 / 1',
});

const useDailyMission = (uid: string) =>
  useQuery(['user', uid, 'dailyMission'], async () => {
    const response: Response<Array<DailyMission>> = await ky(
      `${import.meta.env.VITE_APP_API_URL}/daily-mission/${uid}`,
    ).json();

    return response.result;
  });

const useDailyMissionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload: AchiveDailyMissionPayload) => {
      const response = await ky.post(
        `${import.meta.env.VITE_APP_API_URL}/mission/achieve`,
        {
          json: {
            missionId: payload.selectedMission.missionId,
            userId: payload.uid,
            hour: 1,
            isDailyMission: true,
          },
        },
      );

      return response.json;
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries('user');
      },
    },
  );
};

const DailyMissionList = () => {
  const uid: string = useRecoilValue(userState);

  const { data, isLoading } = useDailyMission(uid);

  const dailyMissionList = data as Array<DailyMission>;

  const [selectedMission, setSelectedMission] =
    React.useState<DailyMission | null>(null);

  const [informedMisson, setInformedMisson] =
    React.useState<DailyMission | null>(null);

  const handleCloseAchive = () => {
    setSelectedMission(null);
  };

  const handleClickAchive = (misson: DailyMission) => {
    setSelectedMission(misson);
  };

  const handleCloseInfo = () => {
    setInformedMisson(null);
  };
  const handleClickInfo = (misson: DailyMission) => {
    setInformedMisson(misson);
  };

  const { mutate } = useDailyMissionMutation();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ backgroundColor: '#F2F2F2' }}>
      <CardHeader
        title="デイリーミッション"
        titleTypographyProps={{
          fontFamily: ['Yusei Magic', 'sans-serif'].join(','),
          fontSize: { xs: '1.2em', md: '1.5em', lg: '2.0em' },
          marginLeft: '1%',
        }}
        sx={{ backgroundColor: '#F29574' }}
      />
      <CardContent>
        <Grid
          container
          spacing={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {dailyMissionList.map((dmission) => (
            <>
              <Grid item xs={10} sm={8}>
                <DailyMissionCard>
                  <Typography sx={{ ...bodyTypographyStyle }}>
                    {' '}
                    ミッション# {dmission.missionId}
                  </Typography>
                  <Typography
                    sx={{
                      ...bodyBigTypographyStyle,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {dmission.title}
                  </Typography>
                </DailyMissionCard>
              </Grid>
              <Grid item xs={0.5}>
                <IconButton onClick={() => handleClickInfo(dmission)}>
                  <InfoIcon />
                </IconButton>
                <Dialog open={!!informedMisson} onClose={handleCloseInfo}>
                  <DialogTitle>ミッションの詳細</DialogTitle>
                  <DialogContent dividers>
                    <Typography>
                      {informedMisson &&
                        `ミッションの名前： ${informedMisson?.title}`}
                    </Typography>
                    <Typography>
                      {informedMisson &&
                        `獲得ポイント： ${informedMisson?.point} Pt`}
                    </Typography>
                    <Typography>
                      {informedMisson &&
                        `ミッションの説明： ${informedMisson?.description}`}
                    </Typography>
                    <Typography>
                      {informedMisson &&
                        `CO2の削減量： ${informedMisson?.co2Reduction}`}
                    </Typography>
                    <Typography>
                      {informedMisson &&
                        `削減金額： ${informedMisson?.costReduction}`}
                    </Typography>
                    <Typography>
                      {informedMisson && `タグ： ${informedMisson?.keyword}`}
                    </Typography>
                    <Typography>
                      {informedMisson &&
                        `ミッションの難易度： ${informedMisson?.difficulty}`}
                    </Typography>
                    <Typography>
                      ※獲得ポイント，CO2の削減量，削減金額は1時間もしくは1回当たりの値となっています
                    </Typography>
                  </DialogContent>
                </Dialog>
              </Grid>
              <Grid item xs={4} sm={3.2} sx={{ ml: '2%' }}>
                <Box>
                  <Typography sx={{ ...bodyTypographyStyle }}>
                    ミッションを達成する
                  </Typography>
                  <DailyMissionAchiveButton
                    onClick={() => handleClickAchive(dmission)}
                  >
                    <Typography sx={{ ...bodyTypographyStyle }}>
                      1h/1回
                    </Typography>
                  </DailyMissionAchiveButton>
                </Box>
                <Dialog open={!!selectedMission} onClose={handleCloseAchive}>
                  <DialogTitle>ミッション達成確認</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      このミッションを達成しますか？
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseAchive} color="primary">
                      キャンセル
                    </Button>
                    <Button
                      onClick={() => {
                        if (selectedMission) {
                          mutate({ uid, selectedMission });
                          setSelectedMission(null);
                        }
                      }}
                      color="primary"
                      autoFocus
                    >
                      達成する
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DailyMissionList;
