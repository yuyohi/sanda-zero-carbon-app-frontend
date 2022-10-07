/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';

const MapView: FC<{ imageSource?: string }> = ({ imageSource = '' }) => (
  <img src={imageSource} alt="Map" width="600" />
);

export default MapView;
