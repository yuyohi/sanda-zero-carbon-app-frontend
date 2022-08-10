import { FC } from 'react';
import Box from '@mui/material/Box';
import LoginForm from './loginForm';

const LoginPage: FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}
  >
    <LoginForm />
  </Box>
);

export default LoginPage;
