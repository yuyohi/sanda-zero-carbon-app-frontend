import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSetRecoilState } from 'recoil';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';
import userState from '../../atoms/userAtom';
import drawBottomNavigationState from '../../atoms/bottomNavigationAtom';
import LoginFormView, {
  LoginFormInput,
  LoginState,
} from '../../components/login/loginForm';
import type Response from '../../utils/response';

// バリデーションルール
const schema = yup.object({
  id: yup.string().required('ユーザIDを入力して下さい'),
  password: yup.string().required('パスワードを入力して下さい'),
});

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: yupResolver(schema),
  });
  const setUserId = useSetRecoilState(userState);
  const setDrawBottomNavigation = useSetRecoilState(drawBottomNavigationState);
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState<LoginState>();

  const onSubmit: SubmitHandler<LoginFormInput> = ({ id, password }) => {
    const login = async () => {
      const encodedPassword = btoa(password);

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const response = (await ky
        .get(
          `${
            import.meta.env.VITE_APP_API_URL
          }/user/login?userId=${id}&password=${encodedPassword}`,
        )
        .json()) as Response<boolean>;

      if (response.result) {
        setUserId(id);
        setDrawBottomNavigation(true);
        navigate('../menu');
      } else if (response.code === 'E11') {
        setLoginState({
          success: false,
          message: 'ユーザーIDもしくはパスワードが間違っています。',
        });
      } else {
        setLoginState({
          success: false,
          message: '何らかのエラーが発生しました。',
        });
      }
    };

    void login();
  };

  return (
    <LoginFormView
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      loginState={loginState}
    />
  );
};

export default LoginForm;
