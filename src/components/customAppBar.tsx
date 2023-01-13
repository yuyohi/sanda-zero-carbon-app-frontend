import { AppBar, Button, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import home from '../assets/home_icon.png';
import record from '../assets/record_icon.png';
import quiz from '../assets/quiz_icon.png';
import lookback from '../assets/lookback_icon.png';
import article from '../assets/article_icon.png';
import { AppBarSetting } from '../utils/TypeDefinition';

import UserStatusBar from './userStatusBar';

const customAppBar = () => {
  const ButtonWidth = 100;

  const appBarSettings: Array<AppBarSetting> = [
    {
      src: record,
      alt: 'record icon',
      width: ButtonWidth,
      to: '/mission',
    },
    {
      src: lookback,
      alt: 'lookback icon',
      width: ButtonWidth,
      to: '/lookback',
    },
    {
      src: home,
      alt: 'home icon',
      width: ButtonWidth,
      to: '/menu',
    },
    {
      src: quiz,
      alt: 'quiz icon',
      width: ButtonWidth,
      to: '/quiz',
    },
    {
      src: article,
      alt: 'study icon',
      width: ButtonWidth,
      to: '/article',
    },
  ];

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: 'initial' }}>
      <Toolbar>
        <UserStatusBar />
        <Box
          sx={{
            my: 2,
            width: '100%',
          }}
        >
          <Box
            sx={{ width: '50%', aspectRatio: '389 / 219', maxWidth: '350px' }}
          >
            <img src={Logo} alt="site logo" width="100%" />
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {appBarSettings.map((setting) => (
              <Button
                type="submit"
                component={Link}
                to={setting.to}
                sx={{ backgroundColor: 'transparent', maxWidth: '180px' }}
                key={setting.alt}
              >
                <img src={setting.src} alt={setting.alt} width="130%" />
              </Button>
            ))}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default customAppBar;
