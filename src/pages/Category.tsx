import { VFC, useContext,useState } from 'react';
import { ListedItem } from '../components'
import { Typography, List, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataContext } from '../App';
import { masterItem } from '../features/types';
import { calNextID } from '../app/utils';


const Category: VFC = () => {
  const categoryList = useContext(DataContext).categories.categories;
  const [categories, setCategories] = useState<masterItem[]>(categoryList);
  const addCategory = () => {
    const nextID: number = calNextID(categories);
    const newItem: masterItem = {
      id: nextID,
      name: ''
    }
    setCategories([...categories, newItem]);
  }
  return (
    <>
      <Typography variant="h4" component="h1">Category</Typography>
      <List sx={{ maxWidth: 720 }}>
        {(categories as []).map((category, i) =>
          <ListedItem key={i} data={category} />
        )}
      </List>
      <Fab color="primary" sx={{ position: 'fixed', right: 16, bottom: 16, zIndex: 2 }} aria-label="add">
        <AddIcon onClick={addCategory} />
      </Fab>
    </>
  )
}

export default Category;