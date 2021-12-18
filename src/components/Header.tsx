import { VFC, useState, useContext, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { userLogout } from '../features';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../App';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Tooltip, List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LabelIcon from '@mui/icons-material/Label';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

const menuItem = [
  {
    name: 'Home',
    link: '',
    icon: <HomeIcon />
  },
  {
    name: 'Posts',
    link: 'posts',
    icon: <ListAltIcon />
  },
  {
    name: 'Category',
    link: 'master/category',
    icon: <CategoryIcon />
  },
  {
    name: 'Tag',
    link: 'master/tag',
    icon: <LabelIcon />
  },
  {
    name: 'Account',
    link: 'user',
    icon: <PersonIcon />
  },
];

const Header: VFC = () => {
  const userLoginStatus: boolean = useContext(DataContext).user;
  const dispatch = useAppDispatch();
  const [menu, setMenu] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(userLoginStatus);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenu(!menu);
  }

  const changeLoginStatus = () => {
    if(login) {
      setLogin(false);
      dispatch(userLogout);
    } else {
      navigate('user');
    }
  }
  useEffect(()=>{setLogin(userLoginStatus)},[userLoginStatus]);
  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ pl: 1 }}>
        <Toolbar disableGutters>
          <DashboardIcon sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} />
          {/* PC Logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to='/'
            sx={{ color:'white', textDecoration: 'none', mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            React Editor
          </Typography>
          {/* SP Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => toggleMenu()}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          {/* SP Logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to='/'
            sx={{ color:'white', textDecoration: 'none', flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            React Editor
          </Typography>

          {/* PC Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuItem.map((item, index) => (
              <Button
                key={index}
                component={Link}
                to={`/${item.link}`}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Right Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={login?'Logout':'Login'}>
              <IconButton sx={{ p: 0 }} onClick={changeLoginStatus}>
                {login? <ExitToAppIcon sx={{color:'white'}} />
                : <LockOpenIcon sx={{ color: 'white' }} />}
              </IconButton>
            </Tooltip>
          </Box>

        </Toolbar>
        <Drawer
            anchor='left'
            open={menu}
            onClose={() => setMenu(false)}
          >
            <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setMenu(false)}
            onKeyDown={() => setMenu(false)}
          >
            <List>
              {menuItem.map((item, index) => (
                <ListItem 
                  button
                  key={index}
                  component={Link}
                  to={`/${item.link}`}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Box>
          </Drawer>
      </Container>
    </AppBar>
  );
};
export default Header;
