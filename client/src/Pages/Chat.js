import Header from '../Components/Header';
import ChatOpponents from '../Components/ChatOpponents';
import ChatDialog from '../Components/ChatDialog';
import './Css/Chat.css'
import sound from "../sounds/mixkit-long-pop-2358.wav"

import { useMyContext } from '../Components/UserDataContext';

import { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../Components/Socket';



export default function Chat () {

    const {userdata} = useMyContext()


    const [matches, SetMatches] = useState([])
    const [friendsList, setFriendsList] = useState([])
    const [activefriend, setActivefriend] = useState(null)
    const [roomId, setRoomId] = useState('')
    const [messsages, setMessages] = useState([])
    const [shoulUpdateUsers, setShoulUpdateUsers] = useState(false);
    const[lastMessages, setLastMessages] = useState([])

    const [lastMsgAccept, setlastMsgAccept] = useState(false)
    const [acfriendAccept, setacfriendAccept] = useState(false)
    
    const [UnreadedMessages, setUnreadedMessages] = useState([])


    useEffect(()=>{
       
    },[])




    useEffect(()=>{
        socket.on('unreadedMessages', (data)=>{
            console.log('unreadedMessages')
            setUnreadedMessages(data)
            
        })
    },[])

    useEffect(() => {
        const handleAddUnreaded = (data) => {
            console.log(activefriend, '55');
            setUnreadedMessages((prev) => [...prev, data]);
    
            console.log('ADD', data, UnreadedMessages);
            activefriend &&
                UnreadedMessages.length &&
                setUnreadedMessages((prev) => {
                    const msg = prev.map((msg) => (msg.id === activefriend?.email ? { ...msg, isReaded: true } : msg));
                    const idList = msg.map((item) => item._id);
                    socket.emit('saveReaded', idList);
                    return msg;
                });
        };
    
        socket.on('addUnreaded', handleAddUnreaded);
    
        return () => {
            socket.off('addUnreaded', handleAddUnreaded);
        };
    }, [activefriend, UnreadedMessages]);

    
    

    

    useEffect(()=>{
        socket.on('UpdateReaded', (data)=>{
            console.log('UpdateReaded')
    
            activefriend && messsages.length && setMessages((prev)=>{
                const msg = prev.map(msg => msg.id === activefriend?.email ? {...msg, isReaded: true} : msg)
                const idList = msg.map(item => item._id)
                socket.emit('saveReaded', idList)
                return  msg
            })
    
            activefriend &&  data.id === activefriend.id && socket.emit('updateIread', userdata.email)
        })
    },[])




    // useEffect(()=>{
    //     socket.on('updateMymsg',(data)=>{
    //         console.log("SSKSKNKSNKSKN", activefriend, messsages)
    //         activefriend && messsages.length && setMessages((prev)=>{
    //             const msg = prev.map(msg => msg.recipientEmail === activefriend?.email ? {...msg, isReaded: true} : msg)
    //             const idList = msg.map(item => item._id)
    //             socket.emit('saveReaded', idList)
    //             return  msg
    //         })

    //     })
    // },[userdata])




    useEffect(()=>{
  
            socket.on('addUnreaded', (data) =>{
                try{
                const audio = new Audio(sound);
                audio.play()
            } catch(e){console.log(e)}
                })
   

    },[userdata])



    async function showMatches () {

        try{
            const users = await axios.post('http://localhost:3333/search/matches',null, {
                headers: {"Contet-Type" : "application/json"},
                withCredentials: true
            })
            SetMatches(users.data)

        } catch(e) {console.log('Error ', e)} finally {
            
        }
    
    }




    

    useEffect(()=>{
        showMatches()
    }, [])


    

    return(
        <>
        <Header/>
        <div className='chatcontainer'>
            <ChatOpponents matches={matches} friendsList={friendsList} setFriendsList={setFriendsList} setActivefriend={setActivefriend} activefriend={activefriend} roomId={roomId} setRoomId={setRoomId} messsages={messsages} setMessages={setMessages} lastMessages={lastMessages} setLastMessages={setLastMessages} UnreadedMessages={UnreadedMessages} setUnreadedMessages={setUnreadedMessages} setlastMsgAccept={setlastMsgAccept} setacfriendAccept={setacfriendAccept}/>
            <ChatDialog activefriend={activefriend} roomId={roomId} messsages={messsages} setMessages={setMessages} friendsList={friendsList} setFriendsList={setFriendsList} lastMessages={lastMessages} setLastMessages={setLastMessages}  UnreadedMessages={UnreadedMessages} setUnreadedMessages={setUnreadedMessages} matches={matches} lastMsgAccept={lastMsgAccept} acfriendAccept={acfriendAccept}/>
        </div>
        
        </>
    )
}