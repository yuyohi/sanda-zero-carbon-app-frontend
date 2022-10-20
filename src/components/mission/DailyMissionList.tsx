import {
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
  Typography,
  useTheme,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import ky from 'ky';
import { useRecoilValue } from 'recoil';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import userState from '../../atoms/userAtom';
import Response from '../../utils/response';

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

  const theme = useTheme();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ backgroundColor: '#ffffff' }}>
      <CardHeader
        title="デイリーミッション"
        sx={{ backgroundColor: '#469DBD' }}
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
              <Grid item xs={8}>
                <Card
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography>{dmission.title}</Typography>
                </Card>
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
              <Grid item xs={3.5}>
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => handleClickAchive(dmission)}
                >{`達成 [${dmission.point}Pt]`}</Button>
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
