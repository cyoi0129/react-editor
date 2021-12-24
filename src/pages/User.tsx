// basic
import { VFC, useContext, useState, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
// components
import { Loading, Notice, UserInfo } from '../components';
import { userLogin } from '../features/User'
import { userLoginData, userStatus, NoticeProps } from '../app/types';
import { DataContext } from '../App';
// 3rd party library
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const User: VFC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userStatus: userStatus = useContext(DataContext).user;
  const [login, setLogin] = useState<boolean>(userStatus.isLogined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const defaultNotice: NoticeProps = {
    show: false,
    message: '',
    type: 'success'
  }

  const successNotice: NoticeProps = {
    show: true,
    message: 'Login successed!',
    type: 'success'
  }

  const failedNotice: NoticeProps = {
    show: true,
    message: 'Login failed!',
    type: 'error'
  }

  const [loaded, setLoaded] = useState<NoticeProps>(defaultNotice);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const loginInfo: userLoginData = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    }
    dispatch(userLogin(loginInfo));
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  };

  useEffect(() => {
    if (userStatus.isLogined) {
      setLogin(true);
    } else if (userStatus.isLoginError) {
      setLoaded(failedNotice);
    }
  }, [userStatus]);

  return (
    <>
      {login ?
        <UserInfo />
        :
        <Container component="main" maxWidth="xs">
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Sign in</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
              <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Sign In</Button>
              <Grid container>
                <Grid item xs>
                  <Link to=''>Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to=''>Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      }
      <Loading show={loading} />
      <Notice show={loaded.show} message={loaded.message} type={loaded.type} />
      {/* <Notice show={loaded} message="Save successed!" type="success" />
      <Notice show={error} message="Login error" type="error" /> */}
    </>
  );
}

export default User;