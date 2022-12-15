/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import {
  UseFormHandleSubmit,
  UseFormRegister,
  SubmitHandler,
  FieldErrorsImpl,
  DeepRequired,
} from 'react-hook-form';
import Form from './form';

export type LoginFormInput = {
  id: string;
  password: string;
};

export type LoginState = {
  success: boolean;
  message: string;
};

type LoginFormProps = {
  handleSubmit?: UseFormHandleSubmit<LoginFormInput>;
  onSubmit?: SubmitHandler<LoginFormInput>;
  register?: UseFormRegister<LoginFormInput>;
  errors?: FieldErrorsImpl<DeepRequired<LoginFormInput>>;
  loginState?: LoginState;
};

const LoginForm: FC<LoginFormProps> = ({
  handleSubmit = undefined,
  onSubmit = undefined,
  register = undefined,
  errors = undefined,
  loginState = undefined,
}) => (
  <Card sx={{ width: { xs: '80%', sm: '50%', lg: '20%', xl: '15%' } }}>
    <CardContent>
      <Stack spacing={2}>
        {!loginState || loginState.success ? (
          <div />
        ) : (
          <Alert severity="error">{loginState?.message}</Alert>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Form
            label="ユーザーID"
            formName="id"
            type="text"
            register={register}
            errors={errors}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Form
            label="パスワード"
            formName="password"
            type="password"
            register={register}
            errors={errors}
          />
        </Box>
      </Stack>
      <Box sx={{ mt: 3, display: 'flex' }}>
        <Link to="/signup">
          <Button variant="text">アカウント作成</Button>
        </Link>
        <div style={{ flexGrow: 1 }} />
        {handleSubmit && onSubmit ? (
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            ログイン
          </Button>
        ) : (
          <Button variant="contained">ログイン</Button>
        )}
      </Box>
    </CardContent>
  </Card>
);

export default LoginForm;
