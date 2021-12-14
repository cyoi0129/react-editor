import { VFC, useContext } from 'react';
import { DataContext } from '../App';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { postItem } from '../features/types';
import { getMasterNameByID } from '../app/utils';


export type Props = {
  data: postItem;
}

const PostItem: VFC<Props> = (Props) =>{
  const { data } = Props;
  const cateogries = useContext(DataContext).categories.categories;

  return (
    <Link to={`/post/${String(data.id)}`}>
    <ListItem alignItems="flex-start" sx={{textDecoration: 'none', color: '#555'}}>
      <ListItemAvatar>
        <Avatar alt={data.title} src={data.thumbnail} />
      </ListItemAvatar>
      <ListItemText
        primary={data.title}
        secondary={
          <>
            <Typography
              sx={{ display: 'inline', pr: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {getMasterNameByID(data.category, cateogries)}
            </Typography>
            {data.date}
          </>
        }
      />
    </ListItem>
    </Link>
  )
}

export default PostItem;