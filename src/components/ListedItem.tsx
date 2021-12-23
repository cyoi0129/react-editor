// basic
import { useState, VFC, useEffect } from 'react';
// components
import { ListedItemProps } from '../app/types';
// 3rd party library
import { ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ListedItem: VFC<ListedItemProps> = (Props) => {
  const { data, removeMaster, changeMaster } = Props;
  const [ name, setName ] = useState<string>(data.name);
  const [ id, setId ] = useState<number>(data.id);
  
  const removeItem = () => {
    removeMaster(id);
  }

  const changeItem = (value: string) => {
    setName(value);
    changeMaster({id: id, name: value});
  }

  useEffect(() => {
    setId(data.id);
    setName(data.name);
  }, [data]);

  return (
    <ListItem>
      <Grid container spacing={0}>
        <Grid item xs={1}>
          <ListItemText sx={{pt:1}} primary={id} />
        </Grid>
        <Grid item xs={10}>
          <TextField sx={{width:'90%', maxWidth: 640, mx:'5%'}} value={name} variant="outlined" onChange={(event) => changeItem(event.target.value)} />
        </Grid>
        <Grid item xs={1}>
          <ListItemButton sx={{mt:1}}><ListItemIcon><DeleteIcon color="error" onClick={removeItem} /></ListItemIcon></ListItemButton>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default ListedItem;