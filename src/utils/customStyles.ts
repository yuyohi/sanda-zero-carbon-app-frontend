import { SxProps, Theme } from '@mui/material';

const bodyTypographyStyle: SxProps<Theme> = {
  fontSize: { xs: '0.4em', sm: '0.5em', md: '0.8em', lg: '1.1em' },
  fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
  textShadow: '0.06em 0.03em 0 #B0BEC5, 0.12em 0.075em 0 rgba(0, 0, 0, 0.6)',
  color: '#05736D',
  fontWeight: 'bold',
};

const bodySmallTypographyStyle: SxProps<Theme> = {
  fontSize: { xs: '0.2em', sm: '0.3em', md: '0.7em', lg: '1.0em' },
};

const bodyBigTypographyStyle: SxProps<Theme> = {
  fontSize: { xs: '0.7em', sm: '0.9em', md: '1.1em', lg: '1.4em' },
  fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
  fontWeight: 'bold',
};

const titleTypographyStyle: SxProps<Theme> = {
  fontSize: { xs: '1.2em', md: '1.5em', lg: '2.0em' },
  fontFamily: ['Yusei Magic', 'sans-serif'].join(','),
};

export {
  bodyTypographyStyle,
  bodySmallTypographyStyle,
  titleTypographyStyle,
  bodyBigTypographyStyle,
};
