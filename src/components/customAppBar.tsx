/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WorkspacePremium,
  InsertChart,
  Home,
  Quiz,
  Article,
  AlignHorizontalCenter,
  AspectRatio,
} from '@mui/icons-material';
import { AppBar, Button, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import home from '../assets/home_icon.png';
import record from '../assets/record_icon.png';
import quiz from '../assets/quiz_icon.png';
import lookback from '../assets/lookback_icon.png';
import article from '../assets/article_icon.png';
import { AppBarSetting } from '../utils/TypeDefinition';

const customAppBar = () => {
  const lgButtonWidth = 100;
  const mdButtonWidth = 70;

  const appBarSettingsLg: Array<AppBarSetting> = [
    {
      src: record,
      alt: 'record icon',
      width: lgButtonWidth,
      to: '/mission',
    },
    {
      src: lookback,
      alt: 'lookback icon',
      width: lgButtonWidth,
      to: '/lookback',
    },
    {
      src: home,
      alt: 'home icon',
      width: lgButtonWidth,
      to: '/menu',
    },
    {
      src: quiz,
      alt: 'quiz icon',
      width: lgButtonWidth,
      to: '/quiz',
    },
    {
      src: article,
      alt: 'study icon',
      width: lgButtonWidth,
      to: '/article',
    },
  ];

  const appBarSettingsMd: Array<AppBarSetting> = [
    {
      src: record,
      alt: 'record icon',
      width: mdButtonWidth,
      to: '/mission',
    },
    {
      src: lookback,
      alt: 'lookback icon',
      width: mdButtonWidth,
      to: '/lookback',
    },
    {
      src: home,
      alt: 'home icon',
      width: mdButtonWidth,
      to: '/menu',
    },
    {
      src: quiz,
      alt: 'quiz icon',
      width: mdButtonWidth,
      to: '/quiz',
    },
    {
      src: article,
      alt: 'study icon',
      width: mdButtonWidth,
      to: '/article',
    },
  ];

  return (
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
          <Box sx={{ width: '30%', aspectRatio: '389 / 219' }}>
            <img src={Logo} alt="site logo" width="100%" />
          </Box>

          <Box
            sx={{
              width: '65%',
              display: { sm: 'flex', xs: 'none' },
              justifyContent: 'center',
            }}
          >
            {appBarSettingsLg.map((setting) => (
              <Button
                type="submit"
                component={Link}
                to={setting.to}
                sx={{ backgroundColor: 'transparent' }}
                key={setting.alt}
              >
                <img src={setting.src} alt={setting.alt} width="100%" />
              </Button>
            ))}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default customAppBar;
