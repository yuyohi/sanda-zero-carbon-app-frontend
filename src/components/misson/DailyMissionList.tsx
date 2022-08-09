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

type DailyMission = {
  title: string;
  dailyId: number;
  missionId: number;
  point: number;
  description: string;
  CO2Reduction: number;
  costReduction: number;
  difficulty: string;
};

const dailyMission: Array<DailyMission> = [
  {
    title: 'Mission1',
    dailyId: 1,
    missionId: 1,
    point: 10,
    description: 'TestMission1',
    CO2Reduction: 100,
    costReduction: 100,
    difficulty: 'easy',
  },
  {
    title: 'Mission2',
    dailyId: 2,
    missionId: 2,
    point: 20,
    description: 'TestMission2',
    CO2Reduction: 150,
    costReduction: 150,
    difficulty: 'nomal',
  },
  {
    title: 'Mission3',
    dailyId: 3,
    missionId: 3,
    point: 30,
    description: 'TestMission3',
    CO2Reduction: 200,
    costReduction: 200,
    difficulty: 'hard',
  },
];

const DailyMissionList = () => {
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

  const theme = useTheme();

  return (
    <Card sx={{ backgroundColor: '#ffffff' }}>
      <CardHeader title="デイリーミッション" />
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
          {dailyMission.map((mission) => (
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
                        `CO2の削減量： ${informedMisson?.CO2Reduction}`}
                    </Typography>
                    <Typography>
                      {informedMisson &&
                        `削減金額： ${informedMisson?.costReduction}`}
                    </Typography>
                    <Typography>
                      {informedMisson &&
                        `ミッションの難易度： ${informedMisson?.difficulty}`}
                    </Typography>
                  </DialogContent>
                </Dialog>
              </Grid>
              <Grid item xs={3.5}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleClickAchive(mission)}
                >{`達成 [${mission.point}Pt]`}</Button>
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
                      onClick={handleCloseAchive}
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
