import { VFC, useContext, useState, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useParams } from 'react-router-dom';
import { ListedItem } from '../components'
import { Typography, List, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { DataContext } from '../App';
import { masterItem } from '../features/types';
import { calNextID } from '../app/utils';
import { updateMasterList } from '../features';

const Category: VFC = () => {
    const { type } = useParams();
    const data = useContext(DataContext);
    const dispatch = useAppDispatch();
    const masterList = type === 'category' ? data.categories : data.tags;
    const [masters, setMasters] = useState<masterItem[]>(masterList);

    const addMaster = () => {
        const nextID: number = calNextID(masters);
        const newItem: masterItem = {
            id: nextID,
            name: ''
        }
        setMasters([...masters, newItem]);
    }
    const removeMaster = (id: number) => {
        setMasters(masters.filter(master => master.id !== id));
    }
    const changeMaster = (targetMaster: masterItem) => {
        let tempMasterList = masters.filter(master => master.id !== targetMaster.id);
        tempMasterList.push(targetMaster);
        tempMasterList.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
        });
        setMasters(tempMasterList);
    }

    const saveData = () => {
        const updateTarget = {
            target: type === 'category' ? 'categories' : 'tags',
            data: masters
        }
        dispatch(updateMasterList(updateTarget));
    }
    useEffect(() => {
        setMasters(masterList);
    }, [type]);
    return (
        <>
            <Typography variant="h4" component="h1">{type}</Typography>
            <List sx={{ maxWidth: 720 }}>
                {(masters as []).map((master, i) =>
                    <ListedItem key={i} data={master} changeMaster={changeMaster} removeMaster={removeMaster} />
                )}
            </List>
            <Fab color="primary" aria-label="add" sx={{ position: 'fixed', right: 80, bottom: 16, zIndex: 2 }} onClick={addMaster}>
                <AddIcon />
            </Fab>
            <Fab color="primary" aria-label="save" sx={{ backgroundColor: '#d32f2f', color: '#fff', position: 'fixed', right: 16, bottom: 16, zIndex: 2 }} onClick={saveData}>
                <SaveIcon />
            </Fab>
        </>
    )
}

export default Category;