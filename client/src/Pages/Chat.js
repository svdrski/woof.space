import Header from '../Components/Header';
import ChatOpponents from '../Components/ChatOpponents';
import ChatDialog from '../Components/ChatDialog';
import './Css/Chat.css'
import sound from "../sounds/mixkit-long-pop-2358.wav"

import { useMyContext } from '../Components/UserDataContext';
import { useMessengerContext } from '../Components/Context/MessengerContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../Components/Socket';
import MobileMenuContainer from '../Components/mobileMenuContainer';



export default function Chat () {

    const {userdata} = useMyContext()
    const {setUnreadedMessages,UnreadedMessages, activefriend, messsages,setMessages, SetMatches } = useMessengerContext()




    useEffect(()=>{
        socket.on('unreadedMessages', (data)=>{
            console.log('unreadedMessages')
            setUnreadedMessages((prev)=>{ return data})
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


    // async function showMatches () {

    //     try{
    //         const users = await axios.post('http://localhost:3333/search/matches',null, {
    //             headers: {"Contet-Type" : "application/json"},
    //             withCredentials: true
    //         })
    //         SetMatches(users.data)

    //     } catch(e) {console.log('Error ', e)} finally {
            
    //     }
    
    // }

    
    // useEffect(()=>{
    //     showMatches()
    // }, [])

    return(
        <>
        <Header/>
        <div className='chatcontainer'>
            <ChatOpponents/>
            <ChatDialog />
        </div>
        <MobileMenuContainer />
        {/* setActivefriend={setActivefriend} activefriend={activefriend} sethideOnmobile={sethideOnmobile} */}

        </>
    )
}