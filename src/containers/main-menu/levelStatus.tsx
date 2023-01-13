import { FC, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import ky from 'ky';
import userState from '../../atoms/userAtom';
import LevelView, { Status } from '../../components/main-menu/levelView';
import Response from '../../utils/response';

// 受け取るユーザーステータス
type UserStatus = {
  age: number;
  totalPoint: number;
  level: number;
  nextLevelPercentage: number;
  levelRate: number;
};

/** レベルステータスのコンポーネント */
const LevelStatus: FC = () => {
  const [status, setStatus] = useState<Status | undefined>();

  const userId = useRecoilValue(userState);

  useEffect(() => {
    const fetchUserStatus = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const response = (await ky
        .get(`${import.meta.env.VITE_APP_API_URL}/user?userId=${userId}`)
        .json()) as Response<UserStatus>;

      const userLevelStatus = {
        level: response.result.level,
        expProgress: response.result.nextLevelPercentage * 100,
      };

      setStatus(userLevelStatus);
    };

    void fetchUserStatus();
  }, [userId]);

  return (
    <LevelView
      level={status?.level}
      expProgress={status?.expProgress}
      userId={userId}
    />
  );
};

export default LevelStatus;
