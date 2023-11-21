import axios from 'axios'
import '../Pages/Css/Chat.css'
import { useEffect, useState } from 'react'
import { useMyContext } from '../Components/UserDataContext';
import socket from './Socket';
import { v4 as uuidv4 } from 'uuid';



export default function ChatOpponents ({matches,friendsList, setFriendsList, setActivefriend, activefriend, roomId, setRoomId, messsages, setMessages}){



    const {userdata} = useMyContext()

    async function getOpponents (){
        const dataList = await axios.post('http://localhost:3333/chat/users', {matches})
        setFriendsList(dataList.data)
    }


    useEffect(()=>{
        matches.length > 0 && getOpponents ()
    }, [matches])


    function setOpponentmsg (item){
        socket.emit('leaveRoom', roomId);
        setMessages([])
        setActivefriend(item)
        const id = [userdata.email, item.email].sort().join('')
        setRoomId(id)
        console.log(id)
        socket.emit('createDialog', id)
    }

    




    return(
        <div className="chatFriends">
        <h3>You have {matches.length} matches</h3>
            <div className='dialogsList'>
                {friendsList.length && friendsList.map((item)=>(
                    <div className='dialogPrev' key={uuidv4()} onClick={()=>{setOpponentmsg(item)}}>
                        <div className='avatar' style={{background: `url(http://localhost:3333/${item?.photos[0].slice(2, item.photos[0].length)})`}}></div>
                        <div className='dialogData'>
                            <div className='topData'>
                                <h3>{item.name}</h3>
                                <span className='isOnline'></span>
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