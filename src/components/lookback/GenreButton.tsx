import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';

type GraphGenre = 'point' | 'co2' | 'cost';

const GenreButton = (props: {
  title: string;
  graphGenre: GraphGenre;
  setShowGraphGenre: Dispatch<SetStateAction<GraphGenre>>;
}) => {
  const { title, graphGenre, setShowGraphGenre } = props;
  const handleClick = () => {
    setShowGraphGenre(graphGenre);
  };

  return (
    <Button
      type="submit"
      sx={{ backgroundColor: 'white' }}
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};

export default GenreButton;
