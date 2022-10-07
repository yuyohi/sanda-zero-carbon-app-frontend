import { atom } from 'recoil';

export type MapInformation = {
  currentLocation: number;
  nextLocation: number | null;
  backLocation: number | null;
  imageSource: string | undefined;
  source: string | undefined;
};

const currentLocationInformation = atom<MapInformation>({
  key: 'currentLocationInformation',
  default: {
    currentLocation: 0,
    nextLocation: 0,
    backLocation: 0,
    imageSource: undefined,
    source: undefined,
  },
});

export default currentLocationInformation;
