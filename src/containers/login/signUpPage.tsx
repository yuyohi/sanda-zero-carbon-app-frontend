import { FC } from 'react';
import Box from '@mui/material/Box';
import SignUpForm from './signUpForm';
import Logo from '../../components/login/mainLogo';
import BottomLogo from '../../components/login/bottomLogo';

const SignUpPage: FC = () => (
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
      <SignUpForm />
    </Box>
    <Box sx={{ position: 'fixed', bottom: 0, right: 0 }}>
      <BottomLogo />
    </Box>
  </>
);

export default SignUpPage;
