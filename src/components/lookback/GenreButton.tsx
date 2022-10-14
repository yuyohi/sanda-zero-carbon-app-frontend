import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';

type GraphGenre = 'point' | 'co2' | 'cost';

const GenreButton = (props: {
  title: string;
  img: string;
  graphGenre: GraphGenre;
  setShowGraphGenre: Dispatch<SetStateAction<GraphGenre>>;
}) => {
  const { title, img, graphGenre, setShowGraphGenre } = props;
  const handleClick = () => {
    setShowGraphGenre(graphGenre);
  };

  return (
    <Button
      type="submit"
      style={{ width: '33vw' }}
      sx={{ backgroundColor: 'transparent' }}
      onClick={handleClick}
    >
      <img src={img} alt={title} width={100} />
    </Button>
  );
};

export default GenreButton;
