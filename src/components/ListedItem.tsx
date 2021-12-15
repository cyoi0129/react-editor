import { useState, VFC } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { masterItem } from '../features/types'

export type Props = {
  data: masterItem;
}

const ListedItem: VFC<Props> = (Props) => {
  const { data } = Props;
  const [ name, setName ] = useState<string>(data.name);
  const changeName = () => {
    setName('Changed');
  }
  return (
    <ListItem>
      <Grid container spacing={0}>
        <Grid item xs={1}>
          <ListItemText sx={{pt:1}} primary={data.id} />
        </Grid>
        <Grid item xs={10}>
          <TextField sx={{width:'90%', maxWidth: 640, mx:'5%'}} value={name} variant="outlined" onChange={changeName} />
        </Grid>
        <Grid item xs={1}>
          <ListItemButton sx={{mt:1}}><ListItemIcon><DeleteIcon color="error" /></ListItemIcon></ListItemButton>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default ListedItem;