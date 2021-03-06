// basic
import { VFC, useContext, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useParams, useNavigate } from 'react-router-dom';
// components
import { PostInfo, Editor, Loading, Notice, Preview } from '../components';
import { DataContext } from '../App';
import { postItem, postInfo, postContent } from '../app/types';
import { getPostByID, getPostInfo, post2DB, createPostObj } from '../app/utils';
import { updatePostItem, removePostItem, addPostItem } from '../features';
// 3rd party library
import { Grid, Fab, Typography, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { AnyArray } from 'immer/dist/internal';

const Post: VFC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const posts = useContext(DataContext).posts.posts;
  const postID: string = id ? id : 'new';
  const postObj: postItem = getPostByID(postID, posts);
  const postInfo: postInfo = getPostInfo(postObj);
  const [postMeta, setPostMeta] = useState<postInfo>(postInfo);
  const [postContent, setPostContent] = useState<postContent>(postObj.content);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);

  const changeContent = (data: postContent) => {
    setPostContent(data);
  }

  const changePostInfo = (key: string, value: string | number | number[]) => {
    if (key === 'title') {
      setPostMeta({ ...postMeta, title: value as string });
    } else if (key === 'description') {
      setPostMeta({ ...postMeta, description: value as string })
    } else if (key === 'category') {
      setPostMeta({ ...postMeta, category: value as number })
    } else if (key === 'tag') {
      setPostMeta({ ...postMeta, tag: value as number[] })
    } else if (key === 'thumbnail') {
      setPostMeta({ ...postMeta, thumbnail: value as string })
    }else if (key === 'date') {
      setPostMeta({ ...postMeta, date: value as string })
    } else {
      console.log('Invailed value!')
    }
  }

  const saveData = () => {
    setLoading(true);
    const postData = createPostObj(postID, postMeta, postContent);
    console.log(postData);
    if (postID !== '' && postID !== 'new') {
      dispatch(updatePostItem(postData));
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      const postDataDB = post2DB(postData).data
      dispatch(addPostItem(postDataDB));
      setTimeout(() => {
        setLoaded(true);
      }, 500);
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 2000);
    }
  }

  const changePreview = () => {
    setPreview(!preview);
  }

  const removePost = () => {
    if (postID !== '' && postID !== 'new') {
      setLoading(true);
      dispatch(removePostItem(postID));
      setTimeout(() => {
        setLoaded(true);
      }, 500);
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 2000);
    }
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <PostInfo postInfo={postInfo} changePostInfo={changePostInfo} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" component="h2" sx={{ mt: 1, mb: 2, mx: 1 }}>Content</Typography>
          <Box sx={{ m: 1, px: 2, py: 1, border: 'solid 1px rgba(0, 0, 0, 0.23)', borderRadius: 2, maxHeight: 480, maxWidth: 680, overflow: 'scroll' }}>
            <Editor content={postContent} changeContent={changeContent} />
          </Box>
        </Grid>
      </Grid>
      <Fab sx={{ backgroundColor: '#4caf50', color: '#fff', position: 'fixed', right: 144, bottom: 16, zIndex: 2 }} aria-label="remove" onClick={changePreview}>
        <PreviewIcon />
      </Fab>
      <Fab color="primary" aria-label="save" sx={{ position: 'fixed', right: 80, bottom: 16, zIndex: 2 }} onClick={saveData}>
        <SaveIcon />
      </Fab>
      <Fab sx={{ backgroundColor: '#d32f2f', color: '#fff', position: 'fixed', right: 16, bottom: 16, zIndex: 2 }} aria-label="remove" onClick={removePost}>
        <DeleteIcon />
      </Fab>
      <Preview content={postContent} closePreview={changePreview} showPreview={preview} />
      <Loading show={loading} />
      <Notice show={loaded} message="Save successed!" type="success" />
    </>
  )
}

export default Post;