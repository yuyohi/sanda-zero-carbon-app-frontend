import { FC } from 'react';
import Box from '@mui/material/Box';
import sandaLogo1 from '../../assets/sandazerocarboncity_logo.png';
import sandaLogo2 from '../../assets/sss_logo.png';

const BottomLogo: FC = () => (
  <Box>
    <img src={sandaLogo1} alt="site logo" width="100px" />
    <img src={sandaLogo2} alt="site logo" width="100px" />
  </Box>
);

export default BottomLogo;
