import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import {Routes,Route}from 'react-router-dom'
import useAuth from "./hooks/useAuth";
function App() {
  const {authUser,isLoading}=useAuth()
  if(isLoading) return <div>Loading</div>
  return (
    <div>
      <Routes>

        <Route path='/' element={<Home/>}/>
          <Route path='/login' element={authUser? <Home/>:<Login/>}/>
            <Route path='/signup' element={authUser? <Home/>:<Signup/>}/>
      </Routes>
      

</div>
  )
}

export default App
