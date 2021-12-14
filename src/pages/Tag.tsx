import { VFC, useContext } from 'react';
import { ListedItem } from '../components'
import { Typography, List, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataContext } from '../App';

const Tag: VFC = () => {
  const tags = useContext(DataContext).tags.tags;
  return (
    <>
      <Typography variant="h4" component="h1">Tag</Typography>
      <List sx={{ maxWidth: 720 }}>
        {(tags as []).map((tag, i) =>

          <ListedItem key={i} data={tag} />

        )}
      </List>
      <Fab color="primary" sx={{ position: 'fixed', right: 16, bottom: 16, zIndex: 2 }} aria-label="remove">
        <AddIcon />
      </Fab>
    </>
  )
}

export default Tag;