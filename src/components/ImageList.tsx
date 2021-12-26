// basic
import { VFC, useContext, useEffect, useState } from 'react';
import { DataContext } from '../App';
// components
import { fileItem, ImageListProps } from '../app/types';
// 3rd party library
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Dialog, DialogTitle } from '@mui/material';

const ImageList: VFC<ImageListProps> = (Props) => {
    const fileList = useContext(DataContext).files;
    const { show, changeImage, close } = Props;
    const [list, setList] = useState<fileItem[]>(fileList);
    const [open, setOpen] = useState<boolean>(show);

    const selectImage = (url: string) => {
        changeImage(url);
        setOpen(false);
        close();
    }

    const handleClose = () => {
        setOpen(false);
        close();
    }

    useEffect(() => {
        setOpen(show);
      }, [show]);

      useEffect(() => {
        setList(fileList);
      }, [fileList]);

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Select Image</DialogTitle>
            <List sx={{ maxWidth: 640, maxHeight: 480 }}>
                {(list as Array<fileItem>).map((file, index) =>
                    <ListItem key={index}  onClick={() => selectImage(file.url)}>
                        <ListItemAvatar>
                            <Avatar alt={file.name} src={file.url} />
                        </ListItemAvatar>
                        <ListItemText primary={file.name} secondary={file.url} />
                    </ListItem>
                )}
            </List>
        </Dialog>
    );
}

export default ImageList;
