import { FC, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { ja } from 'date-fns/locale';

type Article = {
  title: string;
  date: Date;
};

export type Articles = {
  articles: Article[];
};

const ArticleView: FC<Articles> = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollPage = () =>
    setCurrentPage((p) => {
      if (p + 1 === articles.length) {
        return 0;
      }

      return p + 1;
    });

  useEffect(() => {
    const timerId = setInterval(scrollPage, 5000);

    return () => clearInterval(timerId);
  });

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Card>
        <Typography variant="h5" component="h5" sx={{ padding: 2 }}>
          {articles ? articles[currentPage].title : false}
        </Typography>
        <Box sx={{ display: 'inline', textAlign: 'end' }}>
          <Typography sx={{ mr: 3 }}>
            {formatDistanceToNow(articles[currentPage].date, { locale: ja })}前
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default ArticleView;
