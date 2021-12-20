import { VFC, useContext, useEffect } from 'react';
import { DataContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { List, Divider, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PostItem } from '../components';

const PostList: VFC = () => {
  const navigate = useNavigate();
  const isLogined = useContext(DataContext).user.isLogined;
  const posts = useContext(DataContext).posts.posts;
  const addPost = () => {
    navigate('/post/new');
  }
  useEffect(() => {
    if (!isLogined) {
      navigate('/user/');
    }
  }, [isLogined]);
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

export default PostList;
