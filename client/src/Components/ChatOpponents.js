import axios from 'axios'
import '../Pages/Css/Chat.css'
import { useEffect, useState } from 'react'
import { useMyContext } from '../Components/UserDataContext';
import socket from './Socket';
import { v4 as uuidv4 } from 'uuid';



export default function ChatOpponents ({matches,friendsList, setFriendsList, setActivefriend, activefriend, roomId, setRoomId, messsages, setMessages, lastMessages, setLastMessages, UnreadedMessages, setUnreadedMessages}){



    const {userdata} = useMyContext()

    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        socket.on('response', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            setForceUpdate((prev) => !prev); // изменение флага
        });
    }, [socket, setMessages]);

    async function getOpponents (){
        const dataList = await axios.post('http://localhost:3333/chat/users', {matches})
        setFriendsList(dataList.data)
        socket.emit('setUserOnline', userdata.email);
    }


    useEffect(()=>{
        matches.length > 0 && getOpponents ()
    }, [matches])



    function setOpponentmsg (item){
        socket.emit('leaveRoom', roomId);
        setMessages([])
        setActivefriend(item)
        const id = [userdata.email, item.email].sort().join('')
        const fullId = {user: userdata.email, roomId:id}
        setRoomId(id)
        socket.emit('createDialog', fullId)
        socket.emit('setReaded', {opponent: item.email, user: userdata.email})

        UnreadedMessages.length &&  setUnreadedMessages((prev)=>{
            return prev.map(msg => msg.id === item.email ? {...msg, isReaded: true} : msg)
        })

    }


    socket.on('messagesStory', (data)=>{
        setMessages(data)
    })
  


    function unreadedFirst(){
        friendsList.sort((a, b) => 
        UnreadedMessages.filter(msg => msg.id === b.email).length -
        UnreadedMessages.filter(msg => msg.id === a.email).length 
    );
    }
 
      
    useEffect(()=>{
        unreadedFirst()
    }, [UnreadedMessages])



    return(
        <div className="chatFriends">
        <h3>You have {matches.length} matches</h3>
            <div className='dialogsList'>
                {friendsList.length && friendsList.map((item)=>(
                    <div className={`dialogPrev ${activefriend?.name === item.name && 'digprevActive'} ${UnreadedMessages.filter(message => (message.id === item.email && !message.isReaded)).length <= 0 && activefriend?.name !== item.name ? 'withoutmessages' : ''}` }  key={uuidv4()} onClick={()=>{setOpponentmsg(item)}}>
                        <div className='avatar' style={{background: `url(http://localhost:3333/${item?.photos[0].slice(2, item.photos[0].length)})`}}></div>
                        {item.isOnline && <span className='isOnline'></span>}

                        <div className='dialogData'>
                            <div className='topData'>
                                <h3>{item.name} <spnan className='inf'>  /{item.dogname}</spnan></h3>
                               
                                <p className='lastMtime'>{lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.time ? lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.time : ''}</p>
                            </div>
                            <div className='botData'>
                                <p>
                                 {UnreadedMessages.length ?
                                 UnreadedMessages.filter(message => message.id === item.email)[UnreadedMessages.filter(message => message.id === item.email).length - 1]?.text ?
                                    !UnreadedMessages.filter(message => message.id === item.email)[UnreadedMessages.filter(message => message.id === item.email).length - 1].isReaded ?
                                        UnreadedMessages.filter(message => message.id === item.email)[UnreadedMessages.filter(message => message.id === item.email).length - 1].text 
                                        
                                            : lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text ? lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text : 'no messages..'
                                            : lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text ? lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text : 'no messages..'
                                            :lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text ? lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text : 'no messages..'}  
                               
                                </p>
                                {UnreadedMessages.filter(message => (message.id === item.email && !message.isReaded)).length > 0 && <span className='unreadedMsg'>{UnreadedMessages.filter(message => (message.id === item.email && !message.isReaded)).length} </span>}

                                {/* <p>
                                {lastMessages ? 
                                `${lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text ? lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text : 'no messages..'}` 
                                : 'loading...'} </p> */}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
           
        </div>
    )
}


