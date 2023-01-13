import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import currentLocationInformation from '../../atoms/mapAtom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '80%', md: '50%' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PlaceModal: FC<{ handleClose: () => void; open: boolean }> = ({
  handleClose,
  open,
}) => {
  const mapInformation = useRecoilValue(currentLocationInformation);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="三田市の名勝"
      aria-describedby="三田市の名勝"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h6" sx={{ textAlign: 'center' }}>
          {mapInformation.placeName}
        </Typography>
        <img src={mapInformation.placeImage} alt="観光地" width="100%" />
      </Box>
    </Modal>
  );
};

export default PlaceModal;
