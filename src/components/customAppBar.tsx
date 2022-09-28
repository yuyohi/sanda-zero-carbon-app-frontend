/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WorkspacePremium,
  InsertChart,
  Home,
  Quiz,
  Article,
  AlignHorizontalCenter,
} from '@mui/icons-material';
import { AppBar, Button, Toolbar, Box } from '@mui/material';
import Logo from '../assets/logo.png';
import home from '../assets/home_icon.png';
import record from '../assets/record_icon.png';
import quiz from '../assets/quiz_icon.png';
import lookback from '../assets/lookback_icon.png';
import study from '../assets/study_icon.png';

const customAppBar = () => (
  <AppBar position="static" color="transparent" sx={{ boxShadow: 'initial' }}>
    <Toolbar>
      <Box
        sx={{
          my: 2,
          justifyContent: 'space-between',
          display: 'flex',
          width: '100%',
        }}
      >
        <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
          <img src={Logo} alt="site logo" width={300} />
        </Box>
        <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
          <img src={Logo} alt="site logo" width={200} />
        </Box>

        <Box
          sx={{
            alignContent: 'center',
            alignItems: 'center',
            display: { xs: 'none', lg: 'flex' },
          }}
        >
          <Button type="submit" sx={{ backgroundColor: 'transparent' }}>
            <img src={record} alt="record icon" width={100} />
          </Button>
          <Button type="submit" sx={{ backgroundColor: 'transparent' }}>
            <img src={lookback} alt="lookback icon" width={100} />
          </Button>
          <Button type="submit" sx={{ backgroundColor: 'transparent' }}>
            <img src={home} alt="home icon" width={100} />
          </Button>
          <Button type="submit" sx={{ backgroundColor: 'transparent' }}>
            <img src={quiz} alt="quiz icon" width={100} />
          </Button>
          <Button type="submit" sx={{ backgroundColor: 'transparent' }}>
            <img src={study} alt="study icon" width={100} />
          </Button>
        </Box>
        <Box
          sx={{
            alignContent: 'center',
            alignItems: 'center',
            display: { xs: 'flex', lg: 'none' },
          }}
        >
          <Button type="submit" sx={{ backgroundColor: 'transparent' }}>
            <img src={record} alt="record icon" width={80} />
          </Button>
          <Button type="submit" sx={{ backgroundColor: 'transparent' }}>
            <img src={lookback} alt="lookback icon" width={80} />
          </Button>
          <Button type="submit" sx={{ backgroundColor: 'transparent' }}>
            <img src={home} alt="home icon" width={80} />
          </Button>
          <Button type="submit" sx={{ backgroundColor: 'transparent' }}>
            <img src={quiz} alt="quiz icon" width={80} />
          </Button>
          <Button type="submit" sx={{ backgroundColor: 'transparent' }}>
            <img src={study} alt="study icon" width={80} />
          </Button>
        </Box>
      </Box>
    </Toolbar>
  </AppBar>
);

export default customAppBar;
