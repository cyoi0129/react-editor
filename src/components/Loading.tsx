// basic
import { VFC, useState, useEffect } from 'react';
// components
import { LoadingProps } from '../app/types';
// 3rd party library
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loading: VFC<LoadingProps> = (Props) => {
    const { show } = Props;
    const [open, setOpen] = useState(show);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{setOpen(show)},[show]);

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loading;