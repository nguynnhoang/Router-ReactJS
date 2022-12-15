import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Posts from './pages/PostsPage';
import Layout from './layout';
function App() {
  const [user, setUser] = useState(null)
  const onChangeUser = (userInfo) => {
    setUser(userInfo)
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout user={user}/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path="login" element={<LoginPage onChangeUser={onChangeUser}/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
