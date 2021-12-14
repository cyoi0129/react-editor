import { VFC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostInfo, Editor } from '../components';
import { DataContext } from '../App';
import { Grid, Fab, Typography, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { postItem, postInfo } from '../features/types';
import { getPostByID, getPostInfo } from '../app/utils';

const Post: VFC = () => {
  const { id } = useParams();
  const posts = useContext(DataContext).posts.posts;
  const postID: number = Number(id);
  const postObj: postItem = getPostByID(postID, posts);
  const postInfo: postInfo = getPostInfo(postObj);

  const [postData, setPostData] = useState<postItem>(postObj);

  const changeContent = (data: any) => {
    setPostData({ ...postData, content: data });
    console.log(data);
  }

  const changePostInfo = (key: string, value: string | number | number[]) => {
    switch (key) {
      case 'title':
        setPostData({ ...postData, title: value as string })
        break;
      case 'description':
        setPostData({ ...postData, description: value as string })
        break;
      case 'cateogry':
        setPostData({ ...postData, category: value as number })
        break;
      case 'tag':
        setPostData({ ...postData, tag: value as number[] })
        break;
      case 'thumbnail':
        setPostData({ ...postData, thumbnail: value as string })
        break;
      default:
        console.log('Invailed value!')
    }
  }

  const saveData = () => {
    console.log(postData);
  }
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <PostInfo postInfo={postInfo} changePostInfo={changePostInfo} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h2" sx={{ mb: 2, mx: 1 }}>Content</Typography>
          <Box sx={{ m: 1, p: 1, border: 'solid 1px #efefef', borderRadius: 2, maxHeight: 480, overflow: 'scroll' }}>
            <Editor content={postObj.content} changeContent={changeContent} />
          </Box>
        </Grid>
      </Grid>
      <Fab color="primary" aria-label="save" sx={{ position: 'fixed', right: 80, bottom: 16, zIndex: 2 }} onClick={saveData}>
        <SaveIcon />
      </Fab>
      <Fab sx={{ backgroundColor: '#d32f2f', color: '#fff', position: 'fixed', right: 16, bottom: 16, zIndex: 2 }} aria-label="remove">
        <DeleteIcon />
      </Fab>
    </>
  )
}

export default Post;