import { FC } from 'react';
import Box from '@mui/material/Box';
import SignUpForm from './signUpForm';

const SignUpPage: FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}
  >
    <SignUpForm />
  </Box>
);

export default SignUpPage;
