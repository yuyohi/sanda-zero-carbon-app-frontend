/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Box, Card, Stack } from '@mui/material';
import { UserLevelStatus } from '../../utils/TypeDefinition';
import flame2 from '../../assets/flame_2.png';

const CircularLevelView = (props: { userLevelStatus: UserLevelStatus }) => {
  const { totalPoint, level, levelRate, nextLevelPercentage } =
    props.userLevelStatus;

  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        backgroundColor: 'transparent',
        backgroundImage: `url(${flame2})`,
        backgroundSize: '100% 100%',
        boxShadow: 'none',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            mt: { xs: '3rem', md: '4.7rem', lg: '6.5rem' },
          }}
        >
          <CircularProgress
            variant="determinate"
            value={nextLevelPercentage * 100}
            size="13rem"
            sx={{ display: { xs: 'none', md: 'none', lg: 'flex' } }}
          />
          <CircularProgress
            variant="determinate"
            value={nextLevelPercentage * 100}
            size="11rem"
            sx={{ display: { xs: 'none', md: 'flex', lg: 'none' } }}
          />
        </Box>

        <Box
          sx={{
            top: 50,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack spacing={1}>
            <Typography>{`Level :${level}`}</Typography>

            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >{`${Math.round(
              nextLevelPercentage * 100,
            )} / ${levelRate} Pt`}</Typography>

            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >{`${Math.round(nextLevelPercentage * 100)}%`}</Typography>
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >{`累計ポイント: ${totalPoint}Pt`}</Typography>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};

export default CircularLevelView;
