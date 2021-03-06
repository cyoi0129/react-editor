// basic
import { VFC } from 'react';
// components
import { convertDate } from '../app/utils';
// 3rd party library
import { Box, Typography } from '@mui/material';

const Footer: VFC = () => {
  const year: string = convertDate(new Date()).yearString;
  return (
    <Box sx={{backgroundColor:'#efefef', bottom:0, textAlign: 'center', position:'absolute', width:'100%', py: 2}}>
      <Typography>&copy; {year} React Editor All Right Reserved.</Typography>
    </Box>
  )
}

export default Footer;