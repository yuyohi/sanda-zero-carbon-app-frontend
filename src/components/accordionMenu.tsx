import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import airballoon from '../assets/airballoon.png';
import { titleTypographyStyle } from '../utils/customStyles';
import { AppBarSetting } from '../utils/TypeDefinition';
import home from '../assets/home_icon.png';
import record from '../assets/record_icon.png';
import quiz from '../assets/quiz_icon.png';
import lookback from '../assets/lookback_icon.png';
import article from '../assets/article_icon.png';

const ButtonWidth = 100;

const appBarSettings: Array<AppBarSetting> = [
  {
    src: record,
    alt: 'record icon',
    width: ButtonWidth,
    to: '/mission',
  },
  {
    src: lookback,
    alt: 'lookback icon',
    width: ButtonWidth,
    to: '/lookback',
  },
  {
    src: home,
    alt: 'home icon',
    width: ButtonWidth,
    to: '/menu',
  },
  {
    src: quiz,
    alt: 'quiz icon',
    width: ButtonWidth,
    to: '/quiz',
  },
  {
    src: article,
    alt: 'study icon',
    width: ButtonWidth,
    to: '/article',
  },
];

const AccordionMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ mr: '20%', width: '30%' }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#F4FFD3',
            borderRadius: '10%',
            alignItems: 'center',
            p: '7%',
            boxShadow: '2px 3px #7A806A',
          }}
        >
          <img src={airballoon} alt="airballoon" width="35px" />
          <Typography
            sx={{
              ...titleTypographyStyle,
              textAlign: 'center',
            }}
          >
            Menu
          </Typography>
          <ArrowDropDownIcon />
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box sx={{ backgroundColor: '#8DF2F2', mt: 'none' }}>
          {appBarSettings.map((setting) => (
            <MenuItem>
              <Button
                type="submit"
                component={Link}
                to={setting.to}
                sx={{ backgroundColor: 'transparent', width: '30px' }}
                key={setting.alt}
              >
                <img src={setting.src} alt={setting.alt} width="80px" />
              </Button>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default AccordionMenu;
