import { VFC, useEffect, createContext } from 'react';
import './App.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './app/hooks';
import Cookies from 'js-cookie';
import { Home, PostList, Post, Master, User } from './pages';
import { Editor, ScrollToTop, Header, Footer } from './components';

import { selectPost, getPostList, getMasterList, selectMaster, getUserData, selectUser } from './features';
import { postList, masterItem, userStatus } from './app/types'

import { Container } from '@mui/material';

export const DataContext = createContext({} as {
  posts: postList,
  categories: masterItem[],
  tags: masterItem[],
  user: userStatus
})

const App: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const postListData = useAppSelector(selectPost);
  const categoryListData = useAppSelector(selectMaster).categories;
  const tagListData = useAppSelector(selectMaster).tags;
  const userStatus = useAppSelector(selectUser);
  const isCookieLogined: boolean = Cookies.get('isLogined') === '1' ? true : false;
  useEffect(() => {
    if (isCookieLogined) {
      dispatch(getUserData());
      dispatch(getPostList());
      dispatch(getMasterList());
    } else {
      navigate('/user/');
    }
  }, [dispatch, isCookieLogined]);
  return (
    <>
      <DataContext.Provider value={{ posts: postListData, categories: categoryListData, tags: tagListData, user: userStatus }}>
        <ScrollToTop />
        <Header />
        <Container className="App-Container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/" element={<PostList />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/master/:type' element={<Master />} />
            <Route path='/user/' element={<User />} />
          </Routes>
        </Container>
        <Footer />
      </DataContext.Provider>
    </>
  );
}

export default App;