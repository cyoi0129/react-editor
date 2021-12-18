import { VFC } from 'react';
import { Box, Typography } from '@mui/material';
import { convertDate } from '../app/utils';
import { dateObject } from '../app/types'

const Footer: VFC = () => {
  const year: string = convertDate(new Date()).yearString;
  return (
    <Box sx={{backgroundColor:'#efefef', bottom:0, textAlign: 'center', position:'absolute', width:'100%', py: 2}}>
      <Typography>&copy; {year} React Editor All Right Reserved.</Typography>
    </Box>
  )
}

export default Footer;