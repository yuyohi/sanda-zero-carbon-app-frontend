import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';

const CustomRadioButton = (props: {
  title: string;
  img: string;
  quizCategory: string;
  setShowQuizCategory: Dispatch<SetStateAction<string>>;
}) => {
  const { title, img, quizCategory, setShowQuizCategory } = props;
  const handleClick = () => {
    setShowQuizCategory(quizCategory);
  };

  return (
    <Button
      type="submit"
      sx={{ backgroundColor: 'transparent' }}
      onClick={handleClick}
    >
      <img src={img} alt={title} width={100} />
    </Button>
  );
};

export default CustomRadioButton;
