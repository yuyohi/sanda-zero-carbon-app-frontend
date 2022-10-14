import { FC, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import ky from 'ky';
import userState from '../../atoms/userAtom';
import type { MapInformation } from '../../atoms/mapAtom';
import currentLocationInformation from '../../atoms/mapAtom';
import Response from '../../utils/response';
import MapView from '../../components/main-menu/map';

/** マップのコンポーネント */
const Map: FC = () => {
  const [mapInformation, setInformation] = useRecoilState(
    currentLocationInformation,
  );

  const userId = useRecoilValue(userState) as string;

  useEffect(() => {
    const fetchMapInformation = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const response = (await ky
        .get(
          `${
            import.meta.env.VITE_APP_API_URL
          }/map/initialLocation?userId=${userId}`,
        )
        .json()) as Response<MapInformation>;

      const userMapInformation = response.result;

      setInformation(userMapInformation);
    };

    void fetchMapInformation();
  }, [userId, setInformation]);

  return <MapView imageSource={mapInformation?.imageSource} />;
};

export default Map;
