import { FC } from 'react';
import { Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';

const MapNavigation: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const a = 29;

  return (
    <Stack directions="row" spacing={1}>
      <IconButton>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton>
        <ChevronRightIcon />
      </IconButton>
    </Stack>
  );
};

export default MapNavigation;
