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
  const [ id, setId ] = useState<number>(data.id);
  return (
    <ListItem>
      <Grid container spacing={0}>
        <Grid item xs={1}>
          <ListItemText sx={{pt:1}} primary={id} />
        </Grid>
        <Grid item xs={8}>
          <TextField sx={{width:'90%', maxWidth: 640, mx:'5%'}} value={name} variant="outlined" />
        </Grid>
        <Grid item xs={1}>
          <ListItemButton sx={{mt:1}}><ListItemIcon><SaveIcon color="primary" /></ListItemIcon></ListItemButton>
        </Grid>
        <Grid item xs={1}>
          <ListItemButton sx={{mt:1}}><ListItemIcon><DeleteIcon color="error" /></ListItemIcon></ListItemButton>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default ListedItem;