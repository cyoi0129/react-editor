// basic
import { VFC, useContext, useEffect, useState } from 'react';
import { DataContext } from '../App';
import { useNavigate } from 'react-router-dom';
// components
import { fileItem } from '../app/types';
import { Notice } from '../components';
// 3rd party library
import { List, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const MediaList: VFC = () => {
  const navigate = useNavigate();
  const isLogined = useContext(DataContext).user.isLogined;
  const fileList = useContext(DataContext).files;
  const [list, setList] = useState<fileItem[]>(fileList);
  const [show, setShow] = useState<boolean>(false);
  const copyPath = (url: string) => {
    setShow(true);
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      setShow(false);
  }, 1000);
  }

  useEffect(() => {
    if (!isLogined) {
      navigate('/user/');
    }
  }, [isLogined]);

  useEffect(() => {
    setList(fileList);
  }, [fileList]);

  return (
    <>
      <Typography variant="h4" component="h1">Media Library</Typography>
      <List sx={{maxWidth: 640}}>
        {(list as Array<fileItem>).map((file, index) => 
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" aria-label="copy" onClick={ () => copyPath(file.url)}>
              <ContentCopyIcon />
            </IconButton>
          }>
            <ListItemAvatar>
              <Avatar alt={file.name} src={file.url} />
            </ListItemAvatar>
            <ListItemText primary={file.name} secondary={file.url} />
          </ListItem>
        )}
      </List>
      <Notice show={show} message="File url copy successed!" type="success" />
    </>
  );
}

export default MediaList;
