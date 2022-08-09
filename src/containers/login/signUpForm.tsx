/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ky from 'ky';
import SignUpFormView from '../../components/login/signUpForm';

export type SignUpFormInput = {
  text: string;
  password: string;
  confirmPassword: string;
};

type ExistResponse = {
  code: string;
  message: string;
  result: boolean;
};

// ユーザIDが既に存在するかをチェックする
const isUnique = async (id: string | undefined): Promise<boolean> => {
  if (!id) {
    return false;
  }

  const response = await ky.get(
    `http://localhost:18080/api/user/exist?userId=${id}`,
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const body = (await response.json()) as ExistResponse;

  return body.result;
};

// バリデーションルール
const schema = yup.object({
  text: yup
    .string()
    .required('ユーザーIDを入力して下さい')
    .test('user-id-test', '既に存在します', (id) => isUnique(id)),
  password: yup
    .string()
    .required('パスワードを入力して下さい')
    .min(8, 'パスワードは8文字以上入力してください')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&].*$/,
      '英字と数字が最低1文字必要です',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'パスワードが一致しません')
    .required('パスワードをもう一度入力して下さい'),
});

const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignUpFormInput> = ({ email, password }) => {
    console.log('test');
  };

  return (
    <SignUpFormView
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
    />
  );
};

export default SignUpForm;
