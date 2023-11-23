import axios from 'axios'
import '../Pages/Css/Chat.css'
import { useEffect, useState } from 'react'
import { useMyContext } from '../Components/UserDataContext';
import socket from './Socket';
import { v4 as uuidv4 } from 'uuid';



export default function ChatOpponents ({matches,friendsList, setFriendsList, setActivefriend, activefriend, roomId, setRoomId, messsages, setMessages}){



    const {userdata} = useMyContext()

    async function getOpponents (){
        console.log("3")
        const dataList = await axios.post('http://localhost:3333/chat/users', {matches})
        setFriendsList(dataList.data)

        console.log("4")
        socket.emit('setUserOnline', userdata.email);
    }


    useEffect(()=>{
        matches.length > 0 && getOpponents ()
    }, [matches])



        // socket.on('connected', (data)=>{
        //     socket.emit('setUserOnline', userdata )
        //     console.log({email: userdata.email})
        // })
    



    function setOpponentmsg (item){
        socket.emit('leaveRoom', roomId);
        setMessages([])
        setActivefriend(item)
        const id = [userdata.email, item.email].sort().join('')
        const fullId = {user: userdata.email, roomId:id}
        setRoomId(id)
        socket.emit('createDialog', fullId)
    }


    socket.on('messagesStory', (data)=>{
        setMessages(data)
    })

    




    return(
        <div className="chatFriends">
        <h3>You have {matches.length} matches</h3>
            <div className='dialogsList'>
                {friendsList.length && friendsList.map((item)=>(
                    <div className={`dialogPrev ${activefriend?.name === item.name && 'digprevActive'}`}  key={uuidv4()} onClick={()=>{setOpponentmsg(item)}}>
                        <div className='avatar' style={{background: `url(http://localhost:3333/${item?.photos[0].slice(2, item.photos[0].length)})`}}></div>
                        <div className='dialogData'>
                            <div className='topData'>
                                <h3>{item.name}</h3>
                                {item.isOnline && <span className='isOnline'></span>}
                                <p className='lastMtime'>09:20</p>
                            </div>

                            <div className='botData'>
                                <p>Hello, how are you...</p>
                                <span className='unreadedMsg'>2</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
           
        </div>
    )
}