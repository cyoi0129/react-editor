// basic
import { VFC, useContext, useEffect, useState, ChangeEvent } from 'react';
import { DataContext } from '../App';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
// components
import { PostItem } from '../components';
import { postItem } from '../app/types';
// 3rd party library
import { List, Divider, Typography, Fab, TextField, Button, FormControl, Stack, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PostList: VFC = () => {
  const navigate = useNavigate();
  const isLogined = useContext(DataContext).user.isLogined;
  const postList = useContext(DataContext).posts.posts;
  const [keyword, setKeyword] = useState<string>('');
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [posts, setPosts] = useState<postItem[] | []>(postList);
  const [offset, setOffset] = useState(0); // 何番目のアイテムから表示するか
  const perPage: number = 10; // 1ページあたりに表示したいアイテムの数
  const handlePageChange = (data: any) => {
    let page_number = data['selected']; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    setOffset(page_number * perPage); // offsetを変更し、表示開始するアイテムの番号を変更
  }

  const changeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const searchOn = () => {
    setIsSearch(true);
    const filteredPostList = posts.filter(post => post.title.includes(keyword));
    setPosts(filteredPostList);
  }

  const searchOff = () => {
    setIsSearch(false);
    setKeyword('');
    setPosts(postList);
  }

  const addPost = () => {
    navigate('/post/new');
  }

  useEffect(() => {
    if (!isLogined) {
      navigate('/user/');
    }
  }, [isLogined]);

  return (
    <>
      <Typography variant="h4" component="h1">Posts{isSearch ? <Typography variant="body1" component="span"> (Include keyword: "{keyword}")</Typography> : ''}</Typography>
      {isSearch ?
        <Chip
          label={keyword}
          sx={{mt:2}}
          variant="outlined"
          onDelete={searchOff}
        />
        :
        <FormControl sx={{ m: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
            <TextField label="Search post" type="search" variant="standard" sx={{ minWidth: 300 }} value={keyword} onChange={changeKeyword} />
            <Button variant="contained" sx={{ py: 1, px: 2 }} onClick={searchOn}>Search</Button>
          </Stack>
        </FormControl>
      }
      <List sx={{ width: '100%', maxWidth: 960, bgcolor: 'background.paper' }}>
        {(posts as []).slice(offset, offset + perPage).map((post, i) =>
          <>
            <PostItem key={i} data={post} />
            <Divider variant="inset" component="li" />
          </>
        )}
      </List>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={Math.ceil(posts.length / perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
        marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
        pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
        onPageChange={handlePageChange} // クリック時のfunction
        containerClassName={'pagination'} // ページネーションであるulに着くクラス名
        activeClassName={'active'} // アクティブなページのliに着くクラス名
        previousClassName={'pagination__previous'} // 「<」のliに着けるクラス名
        nextClassName={'pagination__next'} // 「>」のliに着けるクラス名
        disabledClassName={'pagination__disabled'} // 使用不可の「<,>」に着くクラス名
      />
      <Fab color="primary" aria-label="save" sx={{ position: 'fixed', right: 16, bottom: 16, zIndex: 2 }} onClick={addPost}>
        <AddIcon />
      </Fab>
    </>
  );
}

export default PostList;
