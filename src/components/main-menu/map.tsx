/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';

// 受け取るマップ情報
export type MapInfo = {
  currentLocation?: number;
  nextLocation?: number;
  backLocation?: number;
  imageSource?: string;
  source?: string;
};

const MapView: FC<MapInfo> = ({
  imageSource = '',
  currentLocation = 1,
  nextLocation = 1,
  backLocation = 1,
  source = '',
}) => <img src={imageSource} alt="Map" width="600" />;

export default MapView;
