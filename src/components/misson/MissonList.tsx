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
import React from 'react';

type Mission = {
  missionId: number;
  title: string;
  point: number;
  description: string;
  CO2Reduction: number;
  costReduction: number;
  difficulty: string;
  missionType: string;
  tagId: number;
  keyword: string;
};

const MissionList = (props: { missionList: Array<Mission> }) => {
  const { missionList } = props;

  const [selectedMission, setSelectedMission] = React.useState<Mission | null>(
    null,
  );

  const [informedMisson, setInformedMisson] = React.useState<Mission | null>(
    null,
  );

  const handleCloseAchive = () => {
    setSelectedMission(null);
  };

  const handleClickAchive = (misson: Mission) => {
    setSelectedMission(misson);
  };

  const handleCloseInfo = () => {
    setInformedMisson(null);
  };
  const handleClickInfo = (misson: Mission) => {
    setInformedMisson(misson);
  };

  const theme = useTheme();

  return (
    <Card sx={{ backgroundColor: '#ffffff' }}>
      <CardHeader title="ミッション" />
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
                        `CO2の削減量： ${informedMisson?.CO2Reduction}`}
                    </Typography>
                    <Typography>
                      {informedMisson &&
                        `削減金額： ${informedMisson?.costReduction}`}
                    </Typography>
                    <Typography>
                      {informedMisson &&
                        `キーワード： ${informedMisson?.keyword}`}
                    </Typography>
                    <Typography>
                      {informedMisson &&
                        `ミッションの難易度： ${informedMisson?.difficulty}`}
                    </Typography>
                  </DialogContent>
                </Dialog>
              </Grid>
              <Grid item xs={3.5}>
                {mission.missionType === 'DoType' && (
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => handleClickAchive(mission)}
                  >
                    {`達成 [${mission.point}Pt]`}
                  </Button>
                )}
                {mission.missionType === 'TimeType' && (
                  <ButtonGroup variant="contained">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleClickAchive(mission)}
                    >
                      {`達成 (1時間) [${mission.point}Pt]`}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleClickAchive(mission)}
                    >
                      {`達成 (2時間)[${mission.point * 2}Pt]`}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleClickAchive(mission)}
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

export default MissionList;
