import { FC, ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import userState from '../atoms/userAtom';

type Props = { children: ReactElement };

const ProtectRoute: FC<Props> = ({ children }) => {
  const userId = useRecoilValue(userState);

  if (userId) {
    return children;
  }

  return <Navigate replace to="/login" />;
};

export default ProtectRoute;
