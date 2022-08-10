import { FC } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';
import {
  Article,
  Home,
  InsertChart,
  Quiz,
  WorkspacePremium,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import drawBottomNavigationState from '../atoms/bottomNavigationAtom';

const FixedBottomNavigation: FC = () => {
  const drawBottomNavigation = useRecoilValue(drawBottomNavigationState);

  return (
    <div>
      {drawBottomNavigation ? (
        <Box>
          <BottomNavigation>
            <Link to="/mission">
              <BottomNavigationAction
                label="Mission"
                icon={<WorkspacePremium />}
              />
            </Link>
            <Link to="/lookback">
              <BottomNavigationAction label="Lookback" icon={<InsertChart />} />
            </Link>
            <Link to="/menu">
              <BottomNavigationAction label="Home" icon={<Home />} />
            </Link>
            <BottomNavigationAction label="Quiz" icon={<Quiz />} />
            <BottomNavigationAction label="Article" icon={<Article />} />
          </BottomNavigation>
        </Box>
      ) : (
        false
      )}
    </div>
  );
};

export default FixedBottomNavigation;
