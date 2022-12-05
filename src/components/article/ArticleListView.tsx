import { FC } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
// import { Dispatch, SetStateAction } from 'react';
import { Article } from '../../utils/TypeDefinition';
import { bodyTypographyStyle } from '../../utils/customStyles';

type Props = {
  articleList: Array<Article>;
};

const ArticleListView: FC<Props> = ({ articleList }) => 
  // const handleClick = (article: Article) => {
  //   null
  // }; // クリックされた際に渡すprops

   (
    <Box sx={{ my: '2%' }}>
      <List>
        {articleList &&
          articleList.map((article) => (
            <ListItem>
              <ListItemText
                disableTypography
                primary={
                  <Button
                    // className="button-53"
                    // onClick={() => handleClick(article)}
                    sx={{ backgroundColor: '#febca2' }}
                  >
                    <Typography
                      sx={{
                        ...bodyTypographyStyle,
                        backgroundColor: 'transparent',
                      }}
                    >
                      記事#{article.articleId} : {article.title}
                    </Typography>
                  </Button>
                }
              />
            </ListItem>
          ))}
      </List>
    </Box>
  )
;

export default ArticleListView;
