import { FC, useState } from 'react';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import ky from 'ky';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import PlaceModal from './placeModal';
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mapInformation, setInformation] = useRecoilState(
    currentLocationInformation,
  );
  const userId = useRecoilValue(userState);

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
    <>
      <Stack direction="row" spacing={1}>
        <IconButton>
          <ChevronLeftIcon onClick={goForward} />
        </IconButton>
        <IconButton>
          <Button onClick={handleOpen}>詳細</Button>
        </IconButton>
        <IconButton>
          <ChevronRightIcon onClick={goBack} />
        </IconButton>
      </Stack>
      <PlaceModal handleClose={handleClose} open={open} />
    </>
  );
};
export default MapNavigation;
