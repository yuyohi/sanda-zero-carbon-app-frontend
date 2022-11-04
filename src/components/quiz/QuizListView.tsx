import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
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
    <Box sx={{ my: '2%' }}>
      <List>
        {quizList &&
          quizList.map((quiz) => (
            <ListItem>
              <ListItemText
                disableTypography
                primary={
                  <Button
                    className="button-53"
                    onClick={() => handleClick(quiz)}
                    sx={{ backgroundColor: '#febca2' }}
                  >
                    <Typography
                      sx={{
                        ...bodyTypographyStyle,
                        backgroundColor: 'transparent',
                      }}
                    >
                      Question#{quiz.quizId} : {quiz.title}
                    </Typography>
                  </Button>
                }
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default QuizListView;
