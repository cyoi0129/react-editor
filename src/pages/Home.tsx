import { VFC, useContext } from 'react';
import { DataContext } from '../App';
import { List, Divider, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PostItem } from '../components';
import { useNavigate } from 'react-router-dom';

const Home: VFC = () => {
  const navigate = useNavigate();
  const posts = useContext(DataContext).posts.posts;
  const addPost = () => {
    navigate('/post/new');
  }
  return (
    <>
      <Typography variant="h4" component="h1">Posts</Typography>
      <List sx={{ width: '100%', maxWidth: 960, bgcolor: 'background.paper' }}>
        {(posts as []).map((post, i) =>
          <>
            <PostItem key={i} data={post} />
            <Divider variant="inset" component="li" />
          </>
        )}
      </List>
      <Fab color="primary" aria-label="save" sx={{ position: 'fixed', right: 16, bottom: 16, zIndex: 2 }} onClick={addPost}>
        <AddIcon />
      </Fab>
    </>
  );
}

export default Home;
