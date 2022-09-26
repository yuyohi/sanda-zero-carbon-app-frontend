import {
  WorkspacePremium,
  InsertChart,
  Home,
  Quiz,
  Article,
} from '@mui/icons-material';
import { AppBar, Button, Toolbar, Box } from '@mui/material';
import Logo from '../assets/logo.png';

const customAppBar = () => (
  <AppBar position="static" color="transparent" sx={{ boxShadow: 'initial' }}>
    <Toolbar>
      <Box
        sx={{
          my: 2,
          justifyContent: 'space-between',
          display: 'flex',
          width: '100%',
        }}
      >
        <img src={Logo} alt="site logo" width={300} />
        <Box sx={{ alignContent: 'center' }}>
          <Button size="large" startIcon={<WorkspacePremium />}>
            きろく
          </Button>
          <Button size="large" startIcon={<InsertChart />}>
            ふりかえり
          </Button>
          <Button size="large" startIcon={<Home />}>
            ホーム
          </Button>
          <Button size="large" startIcon={<Quiz />}>
            クイズ
          </Button>
          <Button size="large" startIcon={<Article />}>
            がくしゅう
          </Button>
        </Box>
      </Box>
    </Toolbar>
  </AppBar>
);

export default customAppBar;
