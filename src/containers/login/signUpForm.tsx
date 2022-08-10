import { FC } from 'react';
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

// ユーザIDが既に存在するかをチェックする
const isUnique = async (id: string | undefined): Promise<boolean> => {
  if (!id) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const response = (await ky
    .get(`http://localhost:18080/api/user/exist?userId=${id}`)
    .json()) as Response<boolean>;

  return !response.result;
};

// バリデーションルール
const schema = yup.object({
  id: yup
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

  const setUserId = useSetRecoilState(userState);
  const setDrawBottomNavigation = useSetRecoilState(drawBottomNavigationState);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormInput> = ({ id, password, age }) => {
    const postData = async () => {
      const encodedPassword = btoa(password);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await ky.post(`http://localhost:18080/api/user`, {
        json: {
          userId: id,
          password: encodedPassword,
          age,
        },
      });

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
    />
  );
};

export default SignUpForm;
