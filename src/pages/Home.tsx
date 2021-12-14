import { VFC, useContext } from 'react';
import { DataContext } from '../App';
import { List, Divider, Typography } from '@mui/material';
import { PostItem } from '../components';

const Home: VFC = () => {
  const posts = useContext(DataContext).posts.posts;
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
    </>
  );
}

export default Home;
