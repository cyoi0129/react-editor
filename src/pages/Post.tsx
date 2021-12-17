import { VFC, useContext, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { PostInfo, Editor } from '../components';
import { DataContext } from '../App';
import { Grid, Fab, Typography, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { postItem, postInfo } from '../features/types';
import { getPostByID, getPostInfo, post2DB } from '../app/utils';
import { updatePostItem, removePostItem, addPostItem } from '../features';

const Post: VFC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const posts = useContext(DataContext).posts.posts;
  const dispatch = useAppDispatch();
  const postID: string = id ? id : 'new';
  const postObj: postItem = getPostByID(postID, posts);
  const postInfo: postInfo = getPostInfo(postObj);

  const [postData, setPostData] = useState<postItem>(postObj);

  const changeContent = (data: any) => {
    setPostData({ ...postData, content: data });
    console.log(data);
  }

  const changePostInfo = (key: string, value: string | number | number[]) => {
    if ( key === 'title' ) {
      setPostData({ ...postData, title: value as string });
    } else if ( key === 'description') {
      setPostData({ ...postData, description: value as string })
    } else if ( key === 'category') {
      setPostData({ ...postData, category: value as number })
    } else if ( key === 'tag') {
      setPostData({ ...postData, tag: value as number[] })
    } else if ( key === 'thumbnail') {
      setPostData({ ...postData, thumbnail: value as string })
    } else {
      console.log('Invailed value!')
    }
    // switch (key) {
    //   case 'title':
    //     console.log('title', value);
    //     setPostData({ ...postData, title: value as string })
    //     break;
    //   case 'description':
    //     setPostData({ ...postData, description: value as string })
    //     break;
    //   case 'cateogry':
    //     console.log('category', value);
    //     setPostData({ ...postData, category: value as number })
    //     break;
    //   case 'tag':
    //     setPostData({ ...postData, tag: value as number[] })
    //     break;
    //   case 'thumbnail':
    //     setPostData({ ...postData, thumbnail: value as string })
    //     break;
    //   default:
    //     console.log(key, value)
    //     console.log('Invailed value!')
    // }
  }

  const saveData = () => {
    if(postID !== '' && postID !== 'new') {
      dispatch(updatePostItem(postData));
    } else {
      const postDataDB = post2DB(postData).data
      dispatch(addPostItem(postDataDB));
      navigate('/');
    }
  }

  const removePost = () => {
    if(postID !== '' && postID !== 'new') {
      dispatch(removePostItem(postID));
    }
    navigate('/');
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
      <Fab sx={{ backgroundColor: '#d32f2f', color: '#fff', position: 'fixed', right: 16, bottom: 16, zIndex: 2 }} aria-label="remove" onClick={removePost}>
        <DeleteIcon />
      </Fab>
    </>
  )
}

export default Post;