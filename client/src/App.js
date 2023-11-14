import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Checker from './Components/AuthChecker';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Homepage from './Pages/Homepage';
import Search from './Pages/Search';
import Cookies from 'universal-cookie';
import { createContext, useState } from 'react';
export const cookies = new Cookies();

export const userDataContext = createContext()



function App() {

  const [userData, setUserData] = useState({})


  return (
    <>
    <Routes>
      <Route path='/'  element={<Homepage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/search' element={<Checker><Search/></Checker>}/>
      </Routes>
    </>



  );
}

export default App;
