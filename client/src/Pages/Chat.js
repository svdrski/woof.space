import { useEffect } from 'react';
import './Css/Chat.css'
import sound from "../sounds/mixkit-long-pop-2358.wav"

import Header from '../Components/Header';
import ChatOpponents from '../Components/ChatOpponents';
import ChatDialog from '../Components/ChatDialog';
import { useMyContext } from '../Components/UserDataContext';
import { useMessengerContext } from '../Components/Context/MessengerContext';
import socket from '../Components/Socket';
import MobileMenuContainer from '../Components/mobileMenuContainer';



export default function Chat () {

    const {userdata} = useMyContext()
    const {setUnreadedMessages, activefriend, messsages,setMessages} = useMessengerContext()


    useEffect(()=>{
        socket.on('unreadedMessages', (data)=>{
            try{
                console.log('unreadedMessages')
                setUnreadedMessages((prev)=>{ return data})
            } catch(e){console.log('Error', e)}
            })
            
    },[])


    useEffect(()=>{
        socket.on('UpdateReaded', (data)=>{
            try{
                activefriend && messsages.length && setMessages((prev)=>{
                    const msg = prev.map(msg => msg.id === activefriend?.email ? {...msg, isReaded: true} : msg)
                    const idList = msg.map(item => item._id)
                    socket.emit('saveReaded', idList)
                    return  msg
                })
                activefriend &&  data.id === activefriend.id && socket.emit('updateIread', userdata.email)
            } catch(e){console.log('Error', e)}
        })
    },[])



    useEffect(()=>{
            socket.on('addUnreaded', (data) =>{
                try{
                    const audio = new Audio(sound);
                    audio.play()
                } catch(e){console.log(e)}
                })

    },[userdata])

    return(
        <>
            <Header/>
            <div className='chatcontainer'>
                <ChatOpponents/>
                <ChatDialog />
            </div>
            <MobileMenuContainer />
        </>
    )
}