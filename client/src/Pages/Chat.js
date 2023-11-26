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
    
    const [UnreadedMessages, setUnreadedMessages] = useState([])


    useEffect(()=>{
       
    },[])


    socket.on('onlineList', (data) => {

        //set all  offline
        setFriendsList((prevFriendsList) => {
            return prevFriendsList.map((user) => {
                return { ...user, isOnline: false };
            });
        });
        
        //set online as online
        setFriendsList((prevFriendsList) => {
            return prevFriendsList.map((user) => {

                if (data.some(item => item.user === user.email)) {
                    return { ...user, isOnline: true };
                }
                return user;
            });
        });
    });


    useEffect(()=>{
        socket.on('unreadedMessages', (data)=>{
            console.log(data)
            setUnreadedMessages(data)
            
        })
    })


    socket.on('addUnreaded', (data) =>{

        setUnreadedMessages([...UnreadedMessages, data])

        activefriend &&  UnreadedMessages.length &&  setUnreadedMessages((prev)=>{
            const msg = prev.map(msg => msg.id === activefriend?.email ? {...msg, isReaded: true} : msg)
            const idList = msg.map(item => item._id)
            socket.emit('saveReaded', idList)
            return  msg
        })
    } )


    // socket.on('UpdateReaded', (data)=>{
    //     activefriend && messsages.length && setMessages((prev)=>{
    //         const msg = prev.map(msg => msg.id === activefriend?.email ? {...msg, isReaded: true} : msg)
    //         const idList = msg.map(item => item._id)
    //         socket.emit('saveReaded', idList)
    //         return  msg
    //     })

        // activefriend &&  data.id === activefriend.id && socket.emit('updateIread', userdata.email)

        // console.log(activefriend)

    // })



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
            console.log("1")
            SetMatches(users.data)

        } catch(e) {console.log('Error ', e)} finally {
            
        }
    
    }




    

    useEffect(()=>{
        showMatches()
        // socket.emit('setUserOnline', userdata )

    }, [])


    

    return(
        <>
        <Header/>
        <div className='chatcontainer'>
            <ChatOpponents matches={matches} friendsList={friendsList} setFriendsList={setFriendsList} setActivefriend={setActivefriend} activefriend={activefriend} roomId={roomId} setRoomId={setRoomId} messsages={messsages} setMessages={setMessages} lastMessages={lastMessages} setLastMessages={setLastMessages} UnreadedMessages={UnreadedMessages} setUnreadedMessages={setUnreadedMessages}/>
            <ChatDialog activefriend={activefriend} roomId={roomId} messsages={messsages} setMessages={setMessages} friendsList={friendsList} setFriendsList={setFriendsList} lastMessages={lastMessages} setLastMessages={setLastMessages}  UnreadedMessages={UnreadedMessages} setUnreadedMessages={setUnreadedMessages}/>
        </div>
        
        </>
    )
}