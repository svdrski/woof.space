import axios from 'axios'
import '../Pages/Css/Chat.css'
import { useEffect, useState } from 'react'
import { useMyContext } from '../Components/UserDataContext';
import socket from './Socket';
import { v4 as uuidv4 } from 'uuid';



export default function ChatOpponents ({matches,friendsList, sethideOnmobile, hideOnmobile, setlastMsgAccept,setacfriendAccept, setFriendsList, setActivefriend, activefriend, roomId, setRoomId, messsages, setMessages, lastMessages, setLastMessages, UnreadedMessages, setUnreadedMessages}){



    const {userdata} = useMyContext()

    const [forceUpdate, setForceUpdate] = useState(false);

 



    async function getOpponents (){
        const dataList = await axios.post('http://localhost:3333/chat/users', {matches})
        setFriendsList(dataList.data)
        //call to get online list
        socket.emit('setUserOnline', userdata.email);
        setlastMsgAccept(true)
    }


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



    useEffect(()=>{
        matches.length > 0 && getOpponents ()
    }, [matches])




    function setOpponentmsg (item){
        console.log('УСТАНОВИЛСЯ')
        setActivefriend(item)
        setacfriendAccept(true)
        socket.emit('leaveRoom', roomId);
        setMessages([])
        const id = [userdata.email, item.email].sort().join('')
        const fullId = {user: userdata.email, roomId:id}
        setRoomId(id)
      
        sethideOnmobile(true)

        // ???????????????????
    
        setUnreadedMessages((prev)=>{
            return []
        })
        // UnreadedMessages.length &&  setUnreadedMessages((prev)=>{
        //     console.log('2')
        //     return prev.map(msg => msg.id === item.email ? {...msg, isReaded: true} : msg)
        // })


        socket.emit('createDialog', fullId)
        socket.emit('setReaded', {opponent: item.email, user: userdata.email})
    }

    // useEffect(()=>{
    //     console.log(activefriend)
    // },[activefriend])


    useEffect(()=>{
        console.log('STOORY')
        socket.on('messagesStory', (data)=>{
            setMessages(data)
        })
    }, [])
  
  


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
        <div className={`chatFriends ${hideOnmobile ? 'openChat' :''}`}>
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
                                    {
                                    UnreadedMessages? 

                                    UnreadedMessages.filter(message => message.id === item.email)[UnreadedMessages.filter(message => message.id === item.email).length - 1]?.text  ?

                                    UnreadedMessages.filter(message => message.id === item.email)[UnreadedMessages.filter(message => message.id === item.email).length - 1]?.text 
                                    :  lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text ? lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email).text : 'no messages..'
                                    : "no 3"
                               
                                }
                                </p>


                                {/* <p>
                                 {UnreadedMessages.length ?
                                 UnreadedMessages.filter(message => message.id === item.email)[UnreadedMessages.filter(message => message.id === item.email).length - 1]?.text ?
                                    !UnreadedMessages.filter(message => message.id === item.email)[UnreadedMessages.filter(message => message.id === item.email).length - 1].isReaded ?
                                        UnreadedMessages.filter(message => message.id === item.email)[UnreadedMessages.filter(message => message.id === item.email).length - 1].text 
                                        // : 'no messages..'
                                        // : 'no messages..'
                                        // : 'no messages..'}
                                       : lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text ? lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text : 'no messages..'
                                        : lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text ? lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text : 'no messages..'
                                        :lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text ? lastMessages.find(message => message?.id ===  item.email || message?.recipientEmail === item.email)?.text : 'no messages..'} 
                               
                                </p> */}
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


