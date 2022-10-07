import { FC, useState } from 'react';
import ky from 'ky';
import useSWR, { useSWRConfig } from 'swr';
import TotalConditionView, {
  Period,
  ReductionCondition,
} from '../../components/main-menu/totalCondition';
import Response from '../../utils/response';

const fetcherWithPath = async (url: string, path: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const response = (await ky
    .get(url + path)
    .json()) as Response<ReductionCondition>;
  const data = response.result;

  return data;
};

const url = `${import.meta.env.VITE_APP_API_URL}/total-condition`;

const TotalCondition: FC<{ period: Period; onClick: () => void }> = ({
  period,
  onClick,
}) => {
  const periodPath = period === '今週' ? '/weekly' : '';
  const { data } = useSWR([url, periodPath], fetcherWithPath);

  return (
    <TotalConditionView reduction={data} period={period} onClick={onClick} />
  );
};

const TotalConditionWrapper: FC = () => {
  const { mutate } = useSWRConfig();
  const [period, setPeriod] = useState<Period>('今週');

  const onClick = () => {
    if (period === '今週') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      mutate([url, '']);
      setPeriod('全期間');
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      mutate([url, '']);
      setPeriod('今週');
    }
  };

  return <TotalCondition period={period} onClick={onClick} />;
};

export default TotalConditionWrapper;
