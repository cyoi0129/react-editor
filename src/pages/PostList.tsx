// basic
import { VFC, useContext, useEffect, useState } from 'react';
import { DataContext } from '../App';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
// components
import { PostItem } from '../components';
// 3rd party library
import { List, Divider, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const PostList: VFC = () => {
  const navigate = useNavigate();
  const isLogined = useContext(DataContext).user.isLogined;
  const posts = useContext(DataContext).posts.posts;

  const [offset, setOffset] = useState(0); // 何番目のアイテムから表示するか
  const perPage: number = 10; // 1ページあたりに表示したいアイテムの数

  const handlePageChange = (data: any) => {
    let page_number = data['selected']; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    setOffset(page_number * perPage); // offsetを変更し、表示開始するアイテムの番号を変更
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
      <Typography variant="h4" component="h1">Posts</Typography>
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
