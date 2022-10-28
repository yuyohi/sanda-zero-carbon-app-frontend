import { styled } from '@mui/system';
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
  Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import ky from 'ky';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import userState from '../../atoms/userAtom';
import Response from '../../utils/response';
import {
  bodyBigTypographyStyle,
  bodyTypographyStyle,
} from '../../utils/customStyles';

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

const MissionCard = styled(Box)({
  outline: 'dashed 0.1em green',
  outlineOffset: '-0.3em',
  borderRadius: '0.5em',
  backgroundColor: '#D1F5E3',
  padding: '2%',
});

const MissionAchiveButton = styled('button')({
  borderRadius: '5%',
  backgroundColor: '#D1F5E3',
  borderTop: '4px solid #48ecc4',
  borderRight: '4px solid #0a5f4a',
  borderBottom: '4px solid #0f745b',
  borderLeft: '4px solid #8cf9de',
  padding: '1%',
  margin: '1%',
  width: '30%',
  aspectRatio: '1 / 1',
});

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

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ backgroundColor: '#F2F2F2' }}>
      <CardHeader
        title="ミッション"
        titleTypographyProps={{
          fontFamily: ['Yusei Magic', 'sans-serif'].join(','),
          fontSize: { xs: '1.2em', md: '1.5em', lg: '2.0em' },
          marginLeft: '1%',
        }}
        sx={{ backgroundColor: '#74F2D8' }}
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
          {missionList.map((mission) => (
            <>
              <Grid item xs={10} sm={8}>
                <MissionCard>
                  <Typography sx={{ ...bodyTypographyStyle }}>
                    {' '}
                    ミッション# {mission.missionId}
                  </Typography>
                  <Typography
                    sx={{
                      ...bodyBigTypographyStyle,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {mission.title}
                  </Typography>
                </MissionCard>
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
              <Grid item xs={4} sm={3.2} sx={{ ml: '2%' }}>
                {mission.missionType === 'DoType' && (
                  <Box>
                    <Typography sx={{ ...bodyTypographyStyle }}>
                      ミッションを達成する
                    </Typography>
                    <MissionAchiveButton
                      onClick={() => handleClickAchive(mission, 1)}
                    >
                      <Typography sx={{ ...bodyTypographyStyle }}>
                        達成
                      </Typography>
                    </MissionAchiveButton>
                  </Box>
                )}
                {mission.missionType === 'TimeType' && (
                  <Box>
                    <Typography sx={{ ...bodyTypographyStyle }}>
                      ミッションを達成する
                    </Typography>
                    <MissionAchiveButton
                      onClick={() => handleClickAchive(mission, 1)}
                    >
                      <Typography sx={{ ...bodyTypographyStyle }}>
                        1h
                      </Typography>
                    </MissionAchiveButton>
                    <MissionAchiveButton
                      onClick={() => handleClickAchive(mission, 2)}
                    >
                      <Typography sx={{ ...bodyTypographyStyle }}>
                        2h
                      </Typography>
                    </MissionAchiveButton>
                    <MissionAchiveButton
                      onClick={() => handleClickAchive(mission, 3)}
                    >
                      <Typography sx={{ ...bodyTypographyStyle }}>
                        3h
                      </Typography>
                    </MissionAchiveButton>
                  </Box>
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
