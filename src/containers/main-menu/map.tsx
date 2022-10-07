import { FC, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import ky from 'ky';
import userState from '../../atoms/userAtom';
import type { MapInformation } from '../../atoms/mapAtom';
import Response from '../../utils/response';
import MapView from '../../components/main-menu/map';

/** マップのコンポーネント */
const Map: FC = () => {
  const [map, setMap] = useState<MapInformation | undefined>();

  const userId = useRecoilValue(userState);

  useEffect(() => {
    const fetchMapInformation = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const response = (await ky
        .get(`http://localhost:18080/api/map/initialLocation?userId=${userId}`)
        .json()) as Response<MapInformation>;

      const userMapInformation = response.result;

      setMap(userMapInformation);
    };

    void fetchMapInformation();
  }, [userId]);

  return <MapView imageSource={map?.imageSource} />;
};

export default Map;
