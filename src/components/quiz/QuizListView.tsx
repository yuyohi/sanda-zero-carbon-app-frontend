import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import { Dispatch, SetStateAction } from 'react';
import { Quiz } from '../../utils/TypeDefinition';
import { bodyTypographyStyle } from '../../utils/customStyles';

const QuizListView = (props: {
  quizList: Array<Quiz>;
  setCurrentQuiz: Dispatch<SetStateAction<Quiz | undefined>>;
}) => {
  const { quizList, setCurrentQuiz } = props;
  const handleClick = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
  };

  return (
    <Box>
      <List>
        {quizList &&
          quizList.map((quiz) => (
            <ListItem>
              <ListItemText
                disableTypography
                primary={
                  <Typography sx={{ ...bodyTypographyStyle }}>
                    Question#{quiz.quizId} : {quiz.title}
                  </Typography>
                }
              />
              <Button onClick={() => handleClick(quiz)}>
                <ForwardIcon />
              </Button>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default QuizListView;
