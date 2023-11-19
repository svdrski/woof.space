import { Link, useNavigate } from 'react-router-dom'
import logo from '../Img/logo.svg'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { cookies } from '../App';
import { useMyContext } from './UserDataContext';


export default function Header(){

    const navigate = useNavigate();
    const {userdata, updateData} = useMyContext()



    async function logOut (){
        localStorage.setItem('userData', '')
        await axios.get('http://localhost:3333/logout', {withCredentials: true})
        navigate('/login')
    } 

    console.log(userdata)




    return(
        <header>
            <span className='leftnav'>
                <img className='headerlogo' src={logo}></img>
                <nav className='navigation'>
                    <Link to='/'>Home</Link>
                    <Link to='/search'>Search</Link>
                    <Link to='/chat'>Chat</Link>
                    <Link to='/profile'>My profile</Link>
                </nav>
            </span>

            <span className='rightnav'>
                <div style={{textAlign:'right'}}>
                <h3>{userdata.dogname}</h3>
                <button className='logout' onClick={logOut}>Log out</button>
                </div>
               {userdata &&  <img className='profileimage' src={`http://localhost:3333${userdata?.photos[0].slice(2, userdata[0]?.photos[0].length)}`}></img>}
            </span>
        </header>
    )
}