import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import { Quiz } from '../../utils/TypeDefinition';

const QuizListView = (props: { quizList: Array<Quiz> }) => {
  const { quizList } = props;

  return (
    <Box>
      <List>
        {quizList.map((quiz) => (
          <>
            <ListItemIcon>
              <ForwardIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography>
                  Question#{quiz.quizId} : {quiz.title}
                </Typography>
              }
            />
          </>
        ))}
      </List>
    </Box>
  );
};

export default QuizListView;
