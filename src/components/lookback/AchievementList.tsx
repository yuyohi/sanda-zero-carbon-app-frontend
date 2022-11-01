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
import {
  bodyBigTypographyStyle,
  bodySmallTypographyStyle,
} from '../../utils/customStyles';

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
    <Card sx={{ backgroundColor: '#F2F2F2' }}>
      <CardHeader
        title="達成したミッション"
        titleTypographyProps={{
          fontFamily: ['Yusei Magic', 'sans-serif'].join(','),
          fontSize: { xs: '1.2em', md: '1.5em', lg: '2.0em' },
          marginLeft: '1%',
        }}
        sx={{ backgroundColor: '#FFD37A' }}
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
          <Grid item xs={3}>
            <Card
              sx={{
                backgroundColor: '#FFE6B9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ ...bodySmallTypographyStyle }}>
                達成日時
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card
              sx={{
                backgroundColor: '#ffdead',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ ...bodySmallTypographyStyle }}>
                ミッション名
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={1}>
            <Card
              sx={{
                backgroundColor: '#ffdead',
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
                    backgroundColor: '#FFE6B9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0.5em',
                    padding: '3%',
                  }}
                >
                  <Typography sx={{ ...bodyBigTypographyStyle }}>
                    {format(
                      parseISO(achievement.achievedAt),
                      'MM月dd日 HH時mm分',
                    )}{' '}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Card
                  sx={{
                    backgroundColor: '#ffdead',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0.5em',
                    padding: '2%',
                  }}
                >
                  <Typography sx={{ ...bodyBigTypographyStyle }}>
                    {achievement.title}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={1}>
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
