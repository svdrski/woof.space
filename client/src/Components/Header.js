import { Link, useNavigate } from 'react-router-dom'
import logo from '../Img/logo.svg'
import { useState, useEffect } from 'react'
import axios from 'axios';
import socket from '../Components/Socket';
import { useMyContext } from './UserDataContext';
import { useMessengerContext } from "./Context/MessengerContext"
import { useSearchContext } from '../Components/Context/SearchContext';

const URL = process.env.REACT_APP_BASE_URL


export default function Header(){

    const navigate = useNavigate();
    
    const {userdata} = useMyContext()
    const {UnreadedMessages, setUnreadedMessages, activefriend, SetMatches, setlastMsgAccept, setFriendsList, matches } = useMessengerContext()
    const {dogsList, setDogsList, breed, rangeValues}= useSearchContext()


    async function logOut (){
        localStorage.setItem('userData', '')
        await axios.get(`${URL}/logout`, {withCredentials: true})
        navigate('/login')
    } 


    // get search opponents
    async function getUsers() {
        try{
            const users = await axios.post(`${URL}/search/users`,{gender: userdata.gender === 'boy' ? 'boy' : 'girl',  breed: breed && breed.breed, age: rangeValues, city:userdata.city }, {
                headers: {"Contet-Type" : "application/json"},
                withCredentials: true
            })
            setDogsList(users.data);
        } catch(e) {console.log('Error ', e)}
    }




    async function showMatches () {
        try{
            const users = await axios.post(`${URL}/search/matches`,null, {
                headers: {"Contet-Type" : "application/json"},
                withCredentials: true
            })
            SetMatches(users.data)
        } catch(e) {console.log('Error ', e)}
    }
    
    

    async function getOpponents (){
        try{
            const dataList = await axios.post(`${URL}/chat/users`, {matches})
            setFriendsList(dataList.data)
            //call to get online list
            socket.emit('setUserOnline', userdata.email);
            setlastMsgAccept(true)
        } catch(e) {console.log('Error ', e)}
    }




    useEffect(()=>{
        getUsers()
        showMatches()
    },[])

  
    //get Opponents list
    useEffect(()=>{
        matches.length > 0 && getOpponents ()
    }, [matches])


    // Update opponents last messages

    useEffect(() => {
        const handleAddUnreaded = (data) => {
            if((activefriend === null) || (activefriend.email !== data.id) ) {
                setUnreadedMessages((prev) => [...prev, data]);
            }            
        };
        socket.on('addUnreaded', handleAddUnreaded);
        return () => {
            socket.off('addUnreaded', handleAddUnreaded);
        };
    }, [activefriend, UnreadedMessages]);
    

        


    return(
        userdata._id && 
        (   <header>
            <span className='leftnav'>
                <img alt='headerlogo' className='headerlogo' src={logo}></img>
                <nav className='navigation'>
                    <Link to='/'>Home</Link>
                    <Link to='/search'>Search {dogsList.length > 0 &&  <span className='unreadedHead'>{dogsList.length}</span>}</Link>
                    <Link to='/chat'>Chat {UnreadedMessages.length > 0 &&  <span className='unreadedHead'>{UnreadedMessages.length}</span>}</Link>
                    <Link to='/profile'>My profile</Link>
                </nav>
            </span>

            <span className='rightnav'>
                <div style={{textAlign:'right'}}>
                <h3>{userdata.dogname}</h3>
                <button className='logout' onClick={logOut}>Log out</button>
                </div>
               {userdata &&  <img  alt='profileimage' className='profileimage' src={`${URL}${userdata?.photos[0].slice(2, userdata[0]?.photos[0].length)}`}></img>}
            </span>
        </header>)
    )
}