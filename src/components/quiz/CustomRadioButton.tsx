import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';
import { QuizCategory } from '../../utils/TypeDefinition';

const CustomRadioButton = (props: {
  title: string;
  img: string;
  buttonQuizCategory: QuizCategory;
  showQuizCategory: QuizCategory;
  setShowQuizCategory: Dispatch<SetStateAction<QuizCategory>>;
}) => {
  const {
    title,
    img,
    buttonQuizCategory,
    showQuizCategory,
    setShowQuizCategory,
  } = props;
  const handleClick = () => {
    setShowQuizCategory(buttonQuizCategory);
  };

  return (
    <Button
      type="submit"
      sx={[
        {
          backgroundColor:
            buttonQuizCategory === showQuizCategory ? 'red' : 'transparent',
        },
        {
          '&:hover': { backgroundColor: 'blue' },
        },
      ]}
      onClick={handleClick}
    >
      <img src={img} alt={title} width={100} />
    </Button>
  );
};

export default CustomRadioButton;
