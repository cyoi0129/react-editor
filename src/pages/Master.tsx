// basic
import { VFC, useContext, useState, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useParams, useNavigate } from 'react-router-dom';
// components
import { ListedItem, Loading, Notice } from '../components';
import { DataContext } from '../App';
import { masterItem } from '../app/types';
import { calNextID } from '../app/utils';
import { updateMasterList } from '../features';
// 3rd party library
import { Typography, List, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

const Category: VFC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { type } = useParams();
    const data = useContext(DataContext);
    const isLogined = useContext(DataContext).user.isLogined;
    const masterList = type === 'category' ? data.categories : data.tags;
    const [masters, setMasters] = useState<masterItem[]>(masterList);
    const [loading, setLoading] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

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
        setLoading(true);
        const updateTarget = {
            target: type === 'category' ? 'categories' : 'tags',
            data: masters
        }
        dispatch(updateMasterList(updateTarget));
        setTimeout(() => {
            setLoaded(true);
        }, 500);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }
    useEffect(() => {
        setMasters(masterList);
    }, [type, masterList]);

    useEffect(() => {
        if (!isLogined) {
            navigate('/user/');
        }
    }, [isLogined]);

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
            <Loading show={loading} />
            <Notice show={loaded} message="Save successed!" type="success" />
        </>
    )
}

export default Category;