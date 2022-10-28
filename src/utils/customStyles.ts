import { SxProps, Theme } from '@mui/material';

const bodyTypographyStyle: SxProps<Theme> = {
  fontSize: { xs: '0.7em', md: '0.9em', lg: '1.2em' },
  fontFamily: ['Rampart One', 'Noto Sans JP'].join(','),
};

const bodySmallTypographyStyle: SxProps<Theme> = {
  fontSize: { xs: '0.3em', md: '0.7em', lg: '1.0em' },
};

const titleTypographyStyle: SxProps<Theme> = {
  fontSize: { xs: '1.2em', md: '1.5em', lg: '2.0em' },
  fontFamily: ['Yusei Magic', 'initial'].join(','),
};

export { bodyTypographyStyle, bodySmallTypographyStyle, titleTypographyStyle };
