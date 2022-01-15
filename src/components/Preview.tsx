// basic
import { VFC, useEffect, useState } from 'react';
// components
import { PreviewProps, ElementItem, headerItem, paragraphItem, listItem, imageItem, libraryItem } from '../app/types';
// 3rd party library
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, List, ListItem } from '@mui/material';

const Preview: VFC<PreviewProps> = (Props) => {
    const { content, closePreview, showPreview } = Props;
    const [open, setOpen] = useState<boolean>(showPreview);
    const [spView, setSpView] = useState<boolean>(true);
    const handleClose = () => {
        setOpen(false);
        closePreview();
    };

    useEffect(() => {
        setOpen(showPreview);
    }, [showPreview]);

    const changeDevice = () => {
        setSpView(!spView)
    }

    const createItem = (item: ElementItem) => {
        let result
        switch (item.type) {
            case 'header':
                result = <Typography variant="h6" component="h3">{(item.data as headerItem).text}</Typography>
                break;
            case 'paragraph':
                console.log((item.data as paragraphItem).text);
                result = <Typography variant="body1" component="p" dangerouslySetInnerHTML={{ __html: (item.data as paragraphItem).text }} />
                break;
            case 'list':
                result = <List>{(item.data as listItem).items.map(itemTxt => <ListItem>{itemTxt}</ListItem>)}</List>
                break;
            case 'image':
                result = <p><img src={(item.data as imageItem).file.url} alt={(item.data as imageItem).caption} /></p>
                break;
            case 'library':
                result = <p><img src={(item.data as libraryItem).url} alt="" /></p>
                break;
            default:
        }
        return result;
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} scroll="paper" aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" sx={{width: spView? 360: 960}} className="previewArea">
                <DialogTitle id="scroll-dialog-title">Preview ({spView? 'SP': 'PC'})</DialogTitle>
                <DialogContent dividers>
                    {(content.blocks as ElementItem[]).map(item => createItem(item))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={changeDevice}>Change Device</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default Preview;