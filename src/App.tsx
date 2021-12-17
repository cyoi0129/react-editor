import { VFC, useEffect, createContext } from 'react';
import './App.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './app/hooks';
// import Cookies from 'js-cookie';
import { Home, Post, Master } from './pages';
import { Editor, ScrollToTop, Header, Footer } from './components';

import { selectPost, getPostList, getMasterList, selectMaster } from './features';
import { postList, masterItem } from './features/types'

import { Container } from '@mui/material';

export const DataContext = createContext({} as {
  posts: postList,
  categories: masterItem[],
  tags: masterItem[]
})

const App: VFC = () => {
  const dispatch = useAppDispatch();
  const postListData = useAppSelector(selectPost);
  const categoryListData = useAppSelector(selectMaster).categories;
  const tagListData = useAppSelector(selectMaster).tags;
  // const categoryListData = useAppSelector(selectCategory);
  // const tagListData = useAppSelector(selectTag);
  useEffect(() => {
    dispatch(getPostList());
    dispatch(getMasterList());
    // dispatch(getCategoryList());
    // dispatch(getTagList());
  }, [dispatch]);
  return (
    <>
      <DataContext.Provider value={{ posts: postListData, categories: categoryListData, tags: tagListData }}>
        <ScrollToTop />
        <Header />
        <Container className="App-Container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/master/:type' element={<Master />} />
            {/* <Route path='/category' element={<Category />} />
            <Route path='/tag' element={<Tag />} /> */}
          </Routes>
        </Container>
        <Footer />
      </DataContext.Provider>
    </>
  );
}

export default App;