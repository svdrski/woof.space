import { Link, useNavigate } from 'react-router-dom'
import logo from '../Img/logo.svg'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { cookies } from '../App';
export default function Header(){

    const navigate = useNavigate();
    const [userData, setuserData] = useState({})



    async function logOut (){
        localStorage.setItem('userData', '')
        await axios.get('http://localhost:3333/logout', {withCredentials: true})
        navigate('/login')
    } 


    useEffect( ()=>{
        const UserData = cookies.get('data')
        setuserData(UserData)
    }, [])



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
                <h3>{userData[1]?.dogname}</h3>
                <button className='logout' onClick={logOut}>Log out</button>
                </div>
               {userData &&  <img className='profileimage' src={`http://localhost:3333${userData[0]?.photos[0].slice(2, userData[0]?.photos[0].length)}`}></img>}
            </span>
        </header>
    )
}