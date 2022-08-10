import { FC, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import ky from 'ky';
import userState from '../../atoms/userAtom';
import type { MapInfo } from '../../components/main-menu/map';
import Response from '../../utils/response';
import MapView from '../../components/main-menu/map';

/** マップのコンポーネント */
const Map: FC = () => {
  const [map, setMap] = useState<MapInfo | undefined>();

  const userId = useRecoilValue(userState);

  useEffect(() => {
    const fetchMapInfo = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const response = (await ky
        .get(`http://localhost:18080/api/map/initialLocation?userId=${userId}`)
        .json()) as Response<MapInfo>;

      const userMapInfo = response.result;

      setMap(userMapInfo);
    };

    void fetchMapInfo();
  }, [userId]);

  return <MapView imageSource={map?.imageSource} />;
};

export default Map;
