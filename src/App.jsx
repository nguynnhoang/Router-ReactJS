import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PostsPage from './pages/PostsPage';
import Layout from './layout';
import { userKey } from './variables';
import { Spinner } from 'reactstrap';
function App() {
  const [user, setUser] = useState(null)
  const onChangeUser = (userInfo) => {
    setUser(userInfo)
  }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem(userKey)
    const convertUser = JSON.parse(user)
    setUser(convertUser)
    setLoading(false)
  }, [])

  return (

    <div className="App">
      {loading
      ? <Spinner/>
      :<Routes>
        <Route path='/' element={<Layout user={user}/>}>
          <Route path='/' element={<HomePage user={user}/>}/>
          <Route path="albums">
            <Route path=':albumsId' element={<PostsPage/>}/>
          </Route>
          <Route path="login" element={<LoginPage onChangeUser={onChangeUser}/>}/>
        </Route>
      </Routes>
      }
    </div>
  )
}

export default App
