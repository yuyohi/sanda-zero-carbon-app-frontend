/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  ButtonGroup,
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
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ky from 'ky';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import userState from '../../atoms/userAtom';
import Response from '../../utils/response';

type Mission = {
  missionId: number;
  title: string;
  point: number;
  description: string;
  co2Reduction: number;
  costReduction: number;
  difficulty: string;
  missionType: string;
  tagId: number;
  keyword: string;
};

type AchiveMissionPayload = {
  uid: string;
  selectedMission: Mission;
  hour: number;
};

const useMission = (uid: string) =>
  useQuery([uid, 'mission'], async () => {
    const response: Response<Array<Mission>> = await ky(
      `${import.meta.env.VITE_APP_API_URL}/mission`,
    ).json();

    return response.result;
  });

const useMissionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload: AchiveMissionPayload) => {
      const response = await ky.post(
        `${import.meta.env.VITE_APP_API_URL}/mission/achieve`,
        {
          json: {
            missionId: payload.selectedMission.missionId,
            userId: payload.uid,
            hour: payload.hour,
            isDailyMission: false,
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

const MissionList = () => {
  const uid: string = useRecoilValue(userState);
  const { data, isLoading } = useMission(uid);

  const missionList = data as Array<Mission>;

  const [selectedMission, setSelectedMission] = React.useState<Mission | null>(
    null,
  );

  const [hour, setHour] = useState<number>(1);

  const [informedMisson, setInformedMisson] = React.useState<Mission | null>(
    null,
  );

  const handleCloseAchive = () => {
    setSelectedMission(null);
  };

  const handleClickAchive = (misson: Mission, time: number) => {
    setSelectedMission(misson);
    setHour(time);
  };

  const handleCloseInfo = () => {
    setInformedMisson(null);
  };
  const handleClickInfo = (misson: Mission) => {
    setInformedMisson(misson);
  };

  const { mutate } = useMissionMutation();

  const theme = useTheme();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ backgroundColor: '#ffffff' }}>
      <CardHeader title="ミッション" sx={{ backgroundColor: '#469DBD' }} />
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
          {missionList.map((mission) => (
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
                  <Typography>{mission.title}</Typography>
                </Card>
              </Grid>
              <Grid item xs={0.5}>
                <IconButton onClick={() => handleClickInfo(mission)}>
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
                {mission.missionType === 'DoType' && (
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => handleClickAchive(mission, 1)}
                  >
                    {`達成 [${mission.point}Pt]`}
                  </Button>
                )}
                {mission.missionType === 'TimeType' && (
                  <ButtonGroup variant="contained">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleClickAchive(mission, 1)}
                    >
                      {`達成 (1時間) [${mission.point}Pt]`}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleClickAchive(mission, 2)}
                    >
                      {`達成 (2時間)[${mission.point * 2}Pt]`}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleClickAchive(mission, 3)}
                    >
                      {`達成 (3時間)[${mission.point * 3}Pt]`}
                    </Button>
                  </ButtonGroup>
                )}

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
                          mutate({ uid, selectedMission, hour });
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

export default MissionList;
