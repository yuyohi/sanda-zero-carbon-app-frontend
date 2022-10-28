import { atom } from 'recoil';

export type MapInformation = {
  currentLocation: number;
  nextLocation: number | null;
  backLocation: number | null;
  mapImage: string | undefined;
  placeImage: string | undefined;
  placeName: string | undefined;
};

const currentLocationInformation = atom<MapInformation>({
  key: 'currentLocationInformation',
  default: {
    currentLocation: 0,
    nextLocation: 0,
    backLocation: 0,
    mapImage: undefined,
    placeImage: undefined,
    placeName: undefined,
  },
});

export default currentLocationInformation;
