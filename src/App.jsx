import { createContext, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { Routes, Route } from 'react-router-dom'
import Layout from './layout';
import { userKey } from './variable.js';
import AlbumPage from './pages/AlbumPage';
import RequireAuth from './components/RequireAuth';
import Error404 from './pages/404';
import PostsPage from './pages/PostsPage';
// axios: call api
// reactstrap + bootstrap
// react-router-dom
// npm install axios bootstrap reactstrap react-router-dom

export const GlobalContext = createContext({
  userInfo: null
})

// Global state (Thông tin,phân quyền, etc..) dùng cho toàn bộ các page nên tạo ra ở App
function App() {
  // Tạo ra một cái state để check lúc render ra html bên dưới có user hay chưa
  const [loading, setLoading] = useState(true);

  // Đây là một global state1
  const [user, setUser] = useState(null);
  // những thông tin global như user, role, setting khi muốn dùng thì sẽ phải truyền 1 props vào component
  const onChangeUser = (userInfo) => {
    setUser(userInfo);
  }

  useEffect(() => {
    // Tạo một biến để chứa thông tin lấy từ localStorage và JSON.parse để đổi thành object sau đó set lại user một lần nữa
    const user = localStorage.getItem(userKey);
    const convertUser = JSON.parse(user);
    setUser(convertUser);
    setLoading(false);
  }, [])


  return (
    <GlobalContext.Provider value = {{userInfo: user}}>
      <div className="App">
        {loading ? <Spinner></Spinner> :
          <Routes>
            <Route path='' element={<Layout user={user} onChangeUser={onChangeUser} />}>
              <Route path='/' element={
                <RequireAuth user={user}>
                  <HomePage user={user} />
                </RequireAuth>} />
              <Route path='posts' element={<RequireAuth user={user}>
                <PostsPage user={user} />
              </RequireAuth>}></Route>
              <Route path='album'>
                <Route path=':albumId' element={<AlbumPage></AlbumPage>}></Route>
              </Route>
              <Route path='login' element={<LoginPage onChangeUser={onChangeUser} />} />
            </Route>
            <Route path='*' element={<Error404></Error404>}></Route>
          </Routes>}
    </div>
    </GlobalContext.Provider>
  )
};

export default App;
