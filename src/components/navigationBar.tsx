import { FC } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import RestoreIcon from '@mui/icons-material/Restore';
import { useRecoilValue } from 'recoil';
import drawBottomNavigationState from '../atoms/bottomNavigationAtom';

const FixedBottomNavigation: FC = () => {
  const drawBottomNavigation = useRecoilValue(drawBottomNavigationState);

  return (
    <div>
      {drawBottomNavigation ? (
        <Box>
          <BottomNavigation>
            <BottomNavigationAction label="ミッション" icon={<RestoreIcon />} />
            <BottomNavigationAction label="振り返り" icon={<RestoreIcon />} />
            <BottomNavigationAction label="ホーム" icon={<RestoreIcon />} />
            <BottomNavigationAction label="クイズ" icon={<RestoreIcon />} />
            <BottomNavigationAction label="バッジ" icon={<RestoreIcon />} />
          </BottomNavigation>
        </Box>
      ) : (
        false
      )}
    </div>
  );
};

export default FixedBottomNavigation;
