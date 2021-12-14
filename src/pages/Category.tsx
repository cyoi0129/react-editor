import { VFC, useContext } from 'react';
import { ListedItem } from '../components'
import { Typography, List, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataContext } from '../App';

const Category: VFC = () => {
  const categories = useContext(DataContext).categories.categories;
  return (
    <>
      <Typography variant="h4" component="h1">Category</Typography>
      <List sx={{ maxWidth: 720 }}>
        {(categories as []).map((category, i) =>
          <ListedItem key={i} data={category} />
        )}
      </List>
      <Fab color="primary" sx={{ position: 'fixed', right: 16, bottom: 16, zIndex: 2 }} aria-label="remove">
        <AddIcon />
      </Fab>
    </>
  )
}

export default Category;