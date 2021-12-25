// basic
import { VFC, useEffect, createContext } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './app/hooks';
// components
import { Home, PostList, Post, Master, User, MediaList } from './pages';
import { ScrollToTop, Header, Footer } from './components';
import { selectPost, getPostList, getMasterList, selectMaster, getUserData, selectUser, selectFile, getFileList } from './features';
import { postList, masterItem, userStatus, fileItem } from './app/types'
import './App.css';
// 3rd party library
import Cookies from 'js-cookie';
import { Container } from '@mui/material';

export const DataContext = createContext({} as {
  posts: postList,
  categories: masterItem[],
  tags: masterItem[],
  user: userStatus,
  files: fileItem[]
})

const App: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const postListData = useAppSelector(selectPost);
  const categoryListData = useAppSelector(selectMaster).categories;
  const tagListData = useAppSelector(selectMaster).tags;
  const userStatus = useAppSelector(selectUser);
  const fileList = useAppSelector(selectFile).files;
  const isCookieLogined: boolean = Cookies.get('isLogined') === '1' ? true : false;
  useEffect(() => {
    if (isCookieLogined) {
      dispatch(getUserData());
      dispatch(getPostList());
      dispatch(getMasterList());
      dispatch(getFileList());
    } else {
      navigate('/user/');
    }
  }, [dispatch, isCookieLogined]);
  return (
    <>
      <DataContext.Provider value={{ posts: postListData, categories: categoryListData, tags: tagListData, user: userStatus, files: fileList }}>
        <ScrollToTop />
        <Header />
        <Container className="App-Container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/" element={<PostList />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/master/:type' element={<Master />} />
            <Route path='/user/' element={<User />} />
            <Route path='/media/' element={<MediaList />} />
          </Routes>
        </Container>
        <Footer />
      </DataContext.Provider>
    </>
  );
}

export default App;