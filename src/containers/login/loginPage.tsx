import { FC } from 'react';
import Box from '@mui/material/Box';
import LoginForm from './loginForm';
import Logo from '../../components/login/mainLogo';
import BottomLogo from '../../components/login/bottomLogo';

const LoginPage: FC = () => (
  <>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        flexDirection: { xs: 'column', lg: 'row' },
      }}
    >
      <Logo />
      <span style={{ display: 'block', width: '50px', height: '50px' }} />

      <LoginForm />
    </Box>
    <Box sx={{ position: 'fixed', bottom: 0, left: 0 }}>
      <BottomLogo />
    </Box>
  </>
);

export default LoginPage;
