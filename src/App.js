import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './component/Nav';
import LoginPage from './pages/LoginPage/index';
import MainPage from './pages/MainPage/index';
import SearchPage from './pages/SearchPage/index';
import DetailPage from './pages/DetailPage/index';

/** 
 * Routes : 
 * 앱에서 생성될 모든 개별 경로에 대한 컨테이너/상위 역할
 * Route로 생성된 자식 컴포넌트 중에서 매칭되는 첫 번째 Route를 렌더링
 */

/**
 * Route :
 * 단일 경로를 만드는데 사용
 * path는 원하는 컴포넌트의 URL 경로를 지정
 * element는 경로에 맞게 렌더링 되어야 하는 컴포넌트를 지정
 */

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />
    </div>
  )
}

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

