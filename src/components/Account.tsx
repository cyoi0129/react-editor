import { VFC, useContext, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { Link } from 'react-router-dom'
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
// import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { userLogin } from '../features/User'
import { userStatus } from '../app/types';
import { DataContext } from '../App';

const Login: VFC = () => {
  const userLoginStatus: boolean = useContext(DataContext).user;
  const [login, setLogin] = useState<boolean>(userLoginStatus)
  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const loginInfo: userStatus = {
      isLogined: true,
      email: data.get('email') as string,
      password: data.get('password') as string,
    }

    dispatch(userLogin(loginInfo));
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      {userLoginStatus ?
        <Typography component="h1" variant="h5">Welcome! You've logined!</Typography>
        :
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
      }
    </Container>
  );
}

export default Login;