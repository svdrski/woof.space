import { Link, useNavigate } from 'react-router-dom'
import logo from '../Img/logo.svg'
import { useState, useEffect } from 'react'
import axios from 'axios';
import socket from '../Components/Socket';

import { cookies } from '../App';
import { useMyContext } from './UserDataContext';
import { useMessengerContext } from "./Context/MessengerContext"
import { useSearchContext } from '../Components/Context/SearchContext';



export default function Header(){

    const navigate = useNavigate();
    const {userdata} = useMyContext()

    const {UnreadedMessages, setUnreadedMessages, SetMatches, setlastMsgAccept, setFriendsList, matches } = useMessengerContext()
    const {dogsList, setDogsList, breed, rangeValues}= useSearchContext()


    async function logOut (){
        localStorage.setItem('userData', '')
        await axios.get('http://localhost:3333/logout', {withCredentials: true})
        navigate('/login')
    } 

    console.log(userdata._id)


    // get unreaded messages
    // useEffect(()=>{
    //     socket.on('unreadedMessages', (data)=>{
    //         console.log('unreadedMessages')
    //         setUnreadedMessages(data)
            
    //     })
    // },[])


    // get search opponents

    async function getUsers() {
        try{
            const users = await axios.post('http://localhost:3333/search/users',{gender: userdata.gender === 'boy' ? 'boy' : 'girl',  breed: breed && breed.breed, age: rangeValues, city:userdata.city }, {
                headers: {"Contet-Type" : "application/json"},
                withCredentials: true
            })
            console.log(users.data)
            setDogsList(users.data);
            console.log('11')

        } catch(e) {console.log('Error ', e)}
    }



    async function showMatches () {

        try{
            const users = await axios.post('http://localhost:3333/search/matches',null, {
                headers: {"Contet-Type" : "application/json"},
                withCredentials: true
            })
            SetMatches(users.data)
            console.log('22')

        } catch(e) {console.log('Error ', e)} finally {
            
        }
    
    }

    async function getOpponents (){
        const dataList = await axios.post('http://localhost:3333/chat/users', {matches})
        setFriendsList(dataList.data)
        //call to get online list
        socket.emit('setUserOnline', userdata.email);
        setlastMsgAccept(true)
        console.log('33')

    }



    useEffect(()=>{
        getUsers()
        showMatches()
    },[])

  
    useEffect(()=>{
        matches.length > 0 && getOpponents ()
    }, [matches])




    return(
        userdata._id && 
        (   <header>
            <span className='leftnav'>
                <img className='headerlogo' src={logo}></img>
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
               {userdata &&  <img className='profileimage' src={`http://localhost:3333${userdata?.photos[0].slice(2, userdata[0]?.photos[0].length)}`}></img>}
            </span>
        </header>)
    )
}