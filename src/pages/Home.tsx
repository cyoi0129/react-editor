import { VFC, useContext, useEffect } from 'react';
import { DataContext } from '../App';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: VFC = () => {
  const navigate = useNavigate();
  const isLogined = useContext(DataContext).user.isLogined;
  useEffect(() => {
    if (!isLogined) {
      navigate('/user/');
    }
  }, [isLogined]);
  return (
    <>
      <Typography variant="h5" component="h1">Welcome to React Editor! Current location is HOME!</Typography>
      
    </>
  );
}

export default Home;
