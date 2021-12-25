// basic
import { VFC, useState, useContext, ChangeEvent, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
// components
import { DataContext } from '../App';
import { userInfoData, userUpdateData } from '../app/types';
import { Loading, Notice } from './';
import { updateUserInfo } from '../features/User';
// 3rd party library
import { uploadFile } from '../app/firebase';
import { styled, Box, TextField, Stack, IconButton, Typography, Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const UserInfo: VFC = () => {
    const dispatch = useAppDispatch();
    const userInfo: userInfoData = useContext(DataContext).user.userInfo;
    const [name, setName] = useState(userInfo.displayName);
    const [image, setImage] = useState(userInfo.photoURL);
    const [loading, setLoading] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const changeImage = async (event: any) => {
        const result = await uploadFile(event.target.files[0]);
        if (result.name) {
            setImage(result.url);
        } else {
            console.log('Upload failed');
        }
    }

    const saveUserInfo = () => {
        const newUserInfo: userUpdateData = {
            displayName: name as string,
            photoURL: image as string
        }
        setLoading(true);
        dispatch(updateUserInfo(newUserInfo));
        setTimeout(() => {
            setLoaded(true);
        }, 500);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    useEffect(() => {
        setName(userInfo.displayName);
        setImage(userInfo.photoURL);
    }, [userInfo]);

    const Input = styled('input')({
        display: 'none',
    });

    return (
        <>
            <Stack sx={{ maxWidth: 480 }}>
                <Typography component="h1" variant="h5" sx={{ p: 1 }}>Welcome! {name}</Typography>
                <Typography component="p" variant="body2" sx={{ p: 2 }}>ID: {userInfo.uid}</Typography>
                <TextField label="Name" onChange={changeName} value={name} multiline sx={{ m: 1 }} />
                <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" onChange={(event) => changeImage(event)} />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <Typography variant="body1">Profile Image</Typography>
                </Stack>
                <Box sx={{ m: 1 }}>
                    {image === null || undefined ? <Typography variant="body2" color="GrayText">No Image</Typography> : <img src={image} width={120} alt="Profile Image" />}
                </Box>
                <Box sx={{ m: 1 }}>
                    <Button variant="contained" onClick={saveUserInfo}>Save</Button>
                </Box>
            </Stack>
            <Loading show={loading} />
            <Notice show={loaded} message="Save successed!" type="success" />
        </>
    )
}

export default UserInfo;