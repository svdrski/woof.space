import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Registration from './Pages/Registration';
import Login from './Pages/Login';

import Homepage from './Pages/Homepage';


function App() {
  return (
    <Routes>
      <Route path='/'  Component={Homepage}/>
      <Route path='/registration' Component={Registration}/>
      <Route path='/login' Component={Login}/>

    </Routes>
  );
}

export default App;
