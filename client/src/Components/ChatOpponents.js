import axios from 'axios'
import '../Pages/Css/Chat.css'
import { useEffect } from 'react'
import { useMyContext } from '../Components/UserDataContext';
import { useMessengerContext } from '../Components/Context/MessengerContext';

import socket from './Socket';
import { v4 as uuidv4 } from 'uuid';

const URL = process.env.REACT_APP_BASE_URL


export default function ChatOpponents (){

    const {userdata} = useMyContext()
    const {matches,friendsList, sethideOnmobile,extraOpponent,  hideOnmobile,setExtraOpponent, setlastMsgAccept,setacfriendAccept, setFriendsList, setActivefriend, activefriend, roomId, setRoomId, messsages, setMessages, lastMessages, setLastMessages, UnreadedMessages, setUnreadedMessages} =  useMessengerContext()
 

    // Update friends list - online/offline

    socket.on('onlineList', (data) => {
        //set all  offline
        setFriendsList((prevFriendsList) => {
            return prevFriendsList.map((user) => {
                return { ...user, isOnline: false };
            });
        });
        
        // set online as online
        setFriendsList((prevFriendsList) => {
            return prevFriendsList.map((user) => {

                if (data.some(item => item.user === user.email)) {
                    return { ...user, isOnline: true };
                }
                return user;
            });
        });
    });




    // Create room with choosen friend
     function setOpponentmsg (item){
        setActivefriend(item)
        setacfriendAccept(true)
        socket.emit('leaveRoom', roomId);
        setMessages([])
        const id = [userdata.email, item.email].sort().join('')
        const fullId = {user: userdata.email, roomId:id}
        setRoomId(id)
        sethideOnmobile(true)

        UnreadedMessages.length &&  setUnreadedMessages((prev)=>{
            return prev.filter(msg => msg.id !== item.email )
        })

        socket.emit('createDialog', fullId)
        socket.emit('setReaded', {opponent: item.email, user: userdata.email, roomId:id})
        setExtraOpponent({})
    }

    function unreadedFirst(){
        friendsList.sort((a, b) => 
        UnreadedMessages.filter(msg => msg.id === b.email).length -
        UnreadedMessages.filter(msg => msg.id === a.email).length 
    );
    }

    async function getOpponents (){
        const dataList = await axios.post(`${URL}/chat/users`, {matches})
        setFriendsList(dataList.data)
        socket.emit('setUserOnline', userdata.email);
        setlastMsgAccept(true)
    }





 

    useEffect(()=>{
        if(extraOpponent._id) {
            setOpponentmsg(extraOpponent)
        }
    },[])


    useEffect(()=>{
        socket.on('messagesStory', (data)=>{
            setMessages(data)
        })
    }, [])
  
      
    useEffect(()=>{
        unreadedFirst()
    }, [UnreadedMessages])


    useEffect(()=>{
        matches.length > 0 && getOpponents ()
    }, [matches])






    return(
        <div className={`chatFriends ${hideOnmobile ? 'openChat' :''}`}>
        <h3> {matches.length ? `You have  ${matches.length}  matches` : 'You will see matches here'}</h3>
            <div className='dialogsList'>
                {friendsList.length > 0 && friendsList.map((item)=>(
                    <div className={`dialogPrev ${activefriend?.name === item.name && 'digprevActive'} ${UnreadedMessages.filter(message => (message.id === item.email && !message.isReaded)).length <= 0 && activefriend?.name !== item.name ? 'withoutmessages' : ''}` }  key={uuidv4()} onClick={()=>{setOpponentmsg(item)}}>
                        <div className='avatar' style={{background: `url(${URL}/${item?.photos[0].slice(2, item.photos[0].length)})`}}></div>
                        {item.isOnline && <span className='isOnline'></span>}

                        <div className='dialogData'>
                            <div className='topData'>
                                <h3>{item.name} <spnan className='inf'>  /{item.dogname}</spnan></h3>
                                <p className='lastMtime'>{lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.time ? lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.time : ''}</p>
                            </div>
                            <div className='botData'>

                                <p>
                                    {
                                    UnreadedMessages? 

                                    UnreadedMessages.filter(message => message.id === item.email)[UnreadedMessages.filter(message => message.id === item.email).length - 1]?.text  ?

                                    UnreadedMessages.filter(message => message.id === item.email)[UnreadedMessages.filter(message => message.id === item.email).length - 1]?.text 
                                    :  lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text ? lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email).text : 'no messages..'
                                    : "no 3"
                               
                                }
                                </p>
                                {UnreadedMessages.filter(message => (message.id === item.email && !message.isReaded)).length > 0 && <span className='unreadedMsg'>{UnreadedMessages.filter(message => (message.id === item.email && !message.isReaded)).length} </span>}

                              
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}



