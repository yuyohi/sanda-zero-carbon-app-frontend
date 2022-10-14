/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import { parseISO, format } from 'date-fns';

type Achievement = {
  title: string;
  missionType: string;
  hour: number;
  getPoint: number;
  getCo2Reduction: number;
  getcostReduction: number;
  achievedAt: Date;
  isDailyMission: boolean;
};

const AchievementList = (props: { achievementList: Array<Achievement> }) => {
  const { achievementList } = props;

  const [informedAchievement, setInformedAchievement] =
    React.useState<Achievement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  const handleCloseInfo = () => {
    setInformedAchievement(null);
  };
  const handleClickInfo = (achievement: Achievement) => {
    setInformedAchievement(achievement);
  };

  return (
    <Card sx={{ backgroundColor: 'lightcyan' }}>
      <CardHeader title="ふりかえり" sx={{ backgroundColor: '#469DBD' }} />
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
          <Grid item xs={3}>
            <Card
              sx={{
                backgroundColor: 'lightblue',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography>時間</Typography>
            </Card>
          </Grid>
          <Grid item xs={8.5}>
            <Card
              sx={{
                backgroundColor: 'lightblue',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography>ミッション名</Typography>
            </Card>
          </Grid>

          <Grid item xs={0.5}>
            <Card
              sx={{
                backgroundColor: 'lightblue',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography />
            </Card>
          </Grid>

          {achievementList.map((achievement) => (
            <>
              <Grid item xs={3}>
                <Card
                  sx={{
                    backgroundColor: 'lightblue',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography>
                    {format(parseISO(achievement.achievedAt), 'MM-dd HH:mm')}{' '}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={8.5}>
                <Card
                  sx={{
                    backgroundColor: 'lightblue',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography>{achievement.title}</Typography>
                </Card>
              </Grid>
              <Grid item xs={0.5}>
                <IconButton onClick={() => handleClickInfo(achievement)}>
                  <InfoIcon />
                </IconButton>
                <Dialog open={!!informedAchievement} onClose={handleCloseInfo}>
                  <DialogTitle>ミッションの詳細</DialogTitle>
                  <DialogContent dividers>
                    <Typography>
                      {informedAchievement &&
                        `ミッションの名前： ${informedAchievement?.title}`}
                    </Typography>
                    <Typography>
                      {informedAchievement &&
                        `ミッションタイプ： ${informedAchievement?.missionType}`}
                    </Typography>
                    <Typography>
                      {informedAchievement &&
                        `獲得ポイント： ${informedAchievement?.getPoint} Pt`}
                    </Typography>
                    <Typography>
                      {informedAchievement &&
                        `CO2の削減量： ${informedAchievement?.getCo2Reduction}`}
                    </Typography>
                    <Typography>
                      {informedAchievement &&
                        `削減金額： ${informedAchievement?.getcostReduction}`}
                    </Typography>
                    <Typography>
                      {informedAchievement && `※ TimeTypeは1時間ごとの値`}
                    </Typography>
                  </DialogContent>
                </Dialog>
              </Grid>
            </>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AchievementList;
