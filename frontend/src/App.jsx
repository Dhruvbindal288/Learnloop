import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import BrowseSkills from './pages/BrowseSkills'
import OnBoardPage from './pages/OnBoardPage'
import {Routes,Route}from 'react-router-dom'
import useAuth from "./hooks/useAuth";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
function App() {

  const {authUser,isLoading}=useAuth()
  if(isLoading) return <div>Loading</div>
  return (
    <div>
      <Navbar></Navbar>
      <Routes>

        <Route path='/' element={<Home/>}/>
          <Route path='/login' element={authUser? <Home/>:<Login/>}/>
            <Route path='/signup' element={authUser? <Home/>:<Signup/>}/>
                <Route path='/browse' element={authUser? <BrowseSkills/>:<Signup/>}/>
                 <Route path='/onboard' element={authUser? <OnBoardPage/>:<Login/>}/>
      </Routes>
      <Footer></Footer>

</div>
  )
}

export default App
