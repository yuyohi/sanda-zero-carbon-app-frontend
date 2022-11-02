/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, ChangeEvent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  UseFormHandleSubmit,
  UseFormRegister,
  SubmitHandler,
  FieldErrorsImpl,
  DeepRequired,
} from 'react-hook-form';
import Form from './form';

export type SignUpFormInput = {
  id: string;
  age: number;
  password: string;
  confirmPassword: string;
  handlePasswordChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

type SignUpFormProps = {
  handleSubmit?: UseFormHandleSubmit<SignUpFormInput>;
  onSubmit?: SubmitHandler<SignUpFormInput>;
  register?: UseFormRegister<SignUpFormInput>;
  errors?: FieldErrorsImpl<DeepRequired<SignUpFormInput>>;
  needPassword?: boolean;
  handlePasswordChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SignUpForm: FC<SignUpFormProps> = ({
  handleSubmit = undefined,
  onSubmit = undefined,
  register = undefined,
  errors = undefined,
  needPassword = false,
  handlePasswordChange = () => undefined,
}) => (
  <Card sx={{ width: { xs: '80%', sm: '50%', lg: '20%', xl: '15%' } }}>
    <CardContent>
      <Stack spacing={2}>
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
            label="年齢"
            formName="age"
            type="number"
            register={register}
            errors={errors}
          />
        </Box>
        {needPassword ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Form
                label="パスワード"
                formName="password"
                type="password"
                register={register}
                errors={errors}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Form
                label="パスワードの確認"
                formName="confirmPassword"
                type="password"
                register={register}
                errors={errors}
              />
            </Box>
          </>
        ) : (
          <div />
        )}
      </Stack>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <div style={{ flexGrow: 1 }} />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={needPassword} onChange={handlePasswordChange} />
            }
            label="パスワードの設定"
          />
        </FormGroup>
      </Box>
      <Box sx={{ mt: 3, display: 'flex' }}>
        <div style={{ flexGrow: 1 }} />
        {handleSubmit && onSubmit ? (
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            アカウント作成
          </Button>
        ) : (
          <Button variant="contained">アカウント作成</Button>
        )}
      </Box>
    </CardContent>
  </Card>
);

export default SignUpForm;
