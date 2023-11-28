import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Checker from './Components/AuthChecker';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Homepage from './Pages/Homepage';
import Search from './Pages/Search';
import Chat from './Pages/Chat';
import socket from './Components/Socket';
import Profile from './Pages/Profile';
import Cookies from 'universal-cookie';
import FriendProfile from './Pages/FriendProfile';
import { useState, useEffect } from 'react';
import { useMyContext } from './Components/UserDataContext';
export const cookies = new Cookies();




function App() {

  const {userdata} = useMyContext()



  useEffect(()=>{
    socket.emit('setUserOnline', userdata.email )
  })









  return (
    <>
    <Routes>
    <Route path='/'  element={<Checker><Homepage/></Checker>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/registration' element={<Registration/>}/>
    <Route path='/search' element={<Search/>}/>
    <Route path='/chat' element={<Checker><Chat/></Checker>}/>
    <Route path='/chat/:id' element={<Checker><Chat/></Checker>}/>
    <Route path='/profile' element={<Checker><Profile/></Checker>}/>
    <Route path='/profile/:id' element={<Checker><FriendProfile/></Checker>}/>

    </Routes>
    </>

  );
}

export default App;
