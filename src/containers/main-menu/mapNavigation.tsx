import { FC } from 'react';
import { Stack } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import ky from 'ky';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import currentLocationInformation from '../../atoms/mapAtom';
import type { MapInformation } from '../../atoms/mapAtom';
import userState from '../../atoms/userAtom';
import Response from '../../utils/response';

const fetchMapInformation = async (
  locationNumber: number,
  userId: string,
): Promise<MapInformation> => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const response = (await ky
    .get(
      `${
        import.meta.env.VITE_APP_API_URL
      }/map?userId=${userId}&currentLocation=${locationNumber}`,
    )
    .json()) as Response<MapInformation>;

  const mapInformation = response.result;

  return mapInformation;
};

const MapNavigation: FC = () => {
  const [mapInformation, setInformation] = useRecoilState(
    currentLocationInformation,
  );
  const userId = useRecoilValue(userState) as string;

  const goForward = () => {
    const fetchNewMap = async () => {
      if (mapInformation.nextLocation != null) {
        const mapInformationResponse = await fetchMapInformation(
          mapInformation.nextLocation,
          userId,
        );

        setInformation(mapInformationResponse);
      }
    };

    void fetchNewMap();
  };

  const goBack = () => {
    const fetchNewMap = async () => {
      if (mapInformation.backLocation != null) {
        const mapInformationResponse = await fetchMapInformation(
          mapInformation.backLocation,
          userId,
        );

        setInformation(mapInformationResponse);
      }
    };

    void fetchNewMap();
  };

  return (
    <Stack direction="row" spacing={1}>
      <IconButton>
        <ChevronLeftIcon onClick={goForward} />
      </IconButton>
      <IconButton>
        <ChevronRightIcon onClick={goBack} />
      </IconButton>
    </Stack>
  );
};
export default MapNavigation;
