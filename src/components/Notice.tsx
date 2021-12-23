// basic
import { forwardRef, useState, SyntheticEvent, VFC, useEffect } from 'react';
// components
import { NoticeProps } from '../app/types';
// 3rd party library
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Notice: VFC<NoticeProps> = (Props) => {
    const { show, type, message } = Props;
    const [open, setOpen] = useState(show);

    const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {setOpen(show)}, [show]);
    
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
        </Stack>
    );
}

export default Notice;