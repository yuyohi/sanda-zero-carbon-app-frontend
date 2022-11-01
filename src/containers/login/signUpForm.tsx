import { FC, useState, ChangeEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userState from '../../atoms/userAtom';
import drawBottomNavigationState from '../../atoms/bottomNavigationAtom';
import SignUpFormView, {
  SignUpFormInput,
} from '../../components/login/signUpForm';
import type Response from '../../utils/response';
import getAutoGeneratePassword from '../../utils/passwordGenerator';

// ユーザIDが既に存在するかをチェックする
const isUnique = async (id: string | undefined): Promise<boolean> => {
  if (!id) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const response = (await ky
    .get(`${import.meta.env.VITE_APP_API_URL}/user/exist?userId=${id}`)
    .json()) as Response<boolean>;

  return !response.result;
};

// バリデーションルール
const schema = yup.object({
  id: yup
    .string()
    .required('ユーザーIDを入力して下さい')
    .test('user-id-test', '既に存在します', (id) => isUnique(id)),
  password: yup.lazy((value) => {
    if (value)
      return yup
        .string()
        .required('パスワードを入力して下さい')
        .min(6, 'パスワードは6文字以上入力してください')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&].*$/,
          '英字と数字が最低1文字必要です',
        );

    return yup.string();
  }),
  confirmPassword: yup.lazy((value) => {
    if (value)
      return yup
        .string()
        .oneOf([yup.ref('password')], 'パスワードが一致しません')
        .required('パスワードをもう一度入力して下さい');

    return yup.string();
  }),
});

const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    resolver: yupResolver(schema),
  });

  const setUserId = useSetRecoilState(userState);
  const setDrawBottomNavigation = useSetRecoilState(drawBottomNavigationState);
  const navigate = useNavigate();
  const [needPassword, setNeedPassword] = useState(false);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNeedPassword(event.target.checked);
  };

  const onSubmit: SubmitHandler<SignUpFormInput> = ({ id, password, age }) => {
    const postData = async () => {
      const encodedPassword = needPassword
        ? btoa(password)
        : getAutoGeneratePassword();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await ky.post(
        `${import.meta.env.VITE_APP_API_URL}/user`,
        {
          json: {
            userId: id,
            password: encodedPassword,
            age,
          },
        },
      );

      setUserId(id);
      setDrawBottomNavigation(true);
      navigate('../menu');
    };
    void postData();
  };

  return (
    <SignUpFormView
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      needPassword={needPassword}
      handlePasswordChange={handlePasswordChange}
    />
  );
};

export default SignUpForm;
