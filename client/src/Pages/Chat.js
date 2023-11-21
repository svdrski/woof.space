import Header from '../Components/Header';
import ChatOpponents from '../Components/ChatOpponents';
import ChatDialog from '../Components/ChatDialog';
import './Css/Chat.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../Components/Socket';


export default function Chat () {

    const [matches, SetMatches] = useState([])
    const [friendsList, setFriendsList] = useState([])
    const [activefriend, setActivefriend] = useState(null)
    const [roomId, setRoomId] = useState('')
    const [messsages, setMessages] = useState([])


    async function showMatches () {
        try{
            const users = await axios.post('http://localhost:3333/search/matches',null, {
                headers: {"Contet-Type" : "application/json"},
                withCredentials: true
            })
            console.log(users.data)
            SetMatches(users.data)
        } catch(e) {console.log('Error ', e)}
    }

    useEffect(()=>{
        showMatches()
    }, [])


    

    return(
        <>
        <Header/>
        <div className='chatcontainer'>
            <ChatOpponents matches={matches} friendsList={friendsList} setFriendsList={setFriendsList} setActivefriend={setActivefriend} activefriend={activefriend} roomId={roomId} setRoomId={setRoomId} messsages={messsages} setMessages={setMessages}/>
            <ChatDialog activefriend={activefriend} roomId={roomId} messsages={messsages} setMessages={setMessages}/>
        </div>
        
        </>
    )
}