import { useEffect, useState, useRef, useCallback} from 'react'
import socket from '../Components/Socket';
import { useMyContext } from '../Components/UserDataContext';
import { useMessengerContext } from '../Components/Context/MessengerContext';
import emojiIcn from '../Img/emoj.svg'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import readed from '../Img/readed.svg'
import unreaded from '../Img/unread.svg'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'



const URL = process.env.REACT_APP_BASE_URL


export default function ChatDialog(){


    const dialogRef = useRef(null);
    const {userdata} = useMyContext()
    const {setStatus, status, activefriend, lastMsgAccept, roomId, messsages, setMessages, friendsList, setFriendsList, setLastMessages, UnreadedMessages, setUnreadedMessages} = useMessengerContext()

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState('')

    const toggleEmojiPicker = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };
  

///  Send Message 
const sender = (e) =>{
    e.preventDefault()
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;

        message.length > 0 && socket.emit('message', {
            text: message,
            name: userdata.name,
            id: userdata.email,
            recipientEmail: activefriend.email,
            SocketID: socket.id,
            roomId: roomId,
            time
        })

        setUnreadedMessages((prev)=>{
            return []
        })

    setLastMessages((prev) => {
        return prev.map((item) =>
            item.roomId === [userdata.email, activefriend.email].sort().join('')
                ? { ...item, text: message }
                : item
        );
    });
    setMessage('')
    socket.emit('updateOppDialogPrev', { id:activefriend.email, opponent: userdata.email, message:message })

}

//Function to call last messages
async function getLastMessages (){
    console.log('getLastMessages')

    const roomId  = []
    console.log(friendsList)
    for (let item of friendsList) {
        const id = [userdata.email, item.email].sort().join('')
        roomId.push(id)
    }
    console.log(roomId)
    socket.emit('getLastMessages', roomId)
}


//  Update opponent last messages 
const handleUpdateLastMessage = useCallback((data) => {
    if (activefriend === null || data?.opponent === activefriend?.email) {
        setLastMessages((prev) => {
            return prev.map((item) =>
                item.roomId === [userdata.email, data.opponent].sort().join('')
                    ? { ...item, text: data.text }
                    : item
            );
        });
        socket.emit('readedNow', { opponent: data.opponent, room: roomId, user: userdata.email });
    }
}, [activefriend, setLastMessages, userdata.email, roomId]);


const isTyping = () => {
    socket.emit('typing', {roomId, message:`${userdata.name} is typing...` } )
}

// Catch message 
useEffect(() => {
    const handleResponse = async (data) => {
        await setMessages((prevMessages) => [...prevMessages, data]);
        setFriendsList((prev) => prev.map((item) => item));
            activefriend &&
            UnreadedMessages.length &&
            setUnreadedMessages((prev) => {
                return prev.map((msg) => (msg.id === activefriend?.email ? { ...msg, isReaded: true } : msg));
            });
    };
    socket.on('response', handleResponse);

    return () => {
        socket.off('response', handleResponse);
    };
}, [activefriend, setMessages, setFriendsList, setUnreadedMessages]);



    

//call to get last Message to preview
useEffect(()=>{
    lastMsgAccept && friendsList.length > 0 && getLastMessages()
},[lastMsgAccept])



// update last massages after response 
useEffect(()=>{
    socket.on('lastMsgList',(data)=>{
        setLastMessages((prev) => {
            return [...prev, ...data];
        })
    })
},[])




useEffect(() => {
    socket.on('updateLastMessage', handleUpdateLastMessage);
    return () => {
        socket.off('updateLastMessage', handleUpdateLastMessage);
    };
}, [handleUpdateLastMessage]);



useEffect(()=>{
    socket.on('respTyping', (data)=> {
        setStatus(data)
        })
        setTimeout(()=>{
            setStatus('')
        }, 2000)
},[status])

 

//    Update messages if both opened dialog

useEffect(() => {
const handleMakeReaded = (data) => {
    if (activefriend && activefriend.email === data.opponent) {
        setTimeout(() => {
            setMessages((prev) => {
                return prev.map((item) => ({ ...item, isReaded: true }));
            });
            socket.emit('uploadToDbMsgDialog', { room: roomId, user: activefriend?.email, opponent: userdata.email });
        }, 400);
    }
};
socket.on('makeReaded', handleMakeReaded);

return () => {
    socket.off('makeReaded', handleMakeReaded);
};
}, [activefriend, setMessages, roomId, userdata.email, socket]);

 


//Make all messages as unreaded

useEffect(()=>{
    socket.on('finisgMsgUpdate', (data) => {
        setMessages((prev)=>{
            return prev.map(item =>  ({...item, isReaded :true}))
        })
      });
},[])


// SHow the last message on the dialog window
useEffect(() => {
    if (dialogRef.current) {
        dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
    }
}, [messsages]);



    return(
        activefriend ?
        <div className="chatFriends messageArea">
            <div className='opponentData'>
                <div className='msgPhoto' style={{background: `url(${URL}/${activefriend?.photos[0].slice(2, activefriend.photos[0].length)})`}}></div>
                {friendsList.find(item => item?.email === activefriend?.email)?.isOnline && <span className='isOnline onlnstaus'></span>}

                <h3>{activefriend?.name}</h3>
                <Link to={`/profile/${activefriend._id}`}>Profile</Link>
            </div>



                
                <div className='dialogArea' ref={dialogRef}>
                    {
                        messsages.map((item)=>(
                            item.name === userdata.name ? (
                            <div className='linemsg' key={uuidv4()}>
                            <div className='chatMsg msgSender'>
                                <p>{item.text}</p>
                                <div className='flexStatus'>
                                    <span className='sendTime'>{item.time}</span>
                                    {item.isReaded ? <img alt='img' src={readed}/>  : <img alt='img' src={unreaded}/> }
                                </div>

                            </div>
                            </div>
                            ) : (
                            <div className='linemsg' key={uuidv4()}>
                            <div className='chatMsg'>
                                <p>{item?.text}</p>
                            <div className='flexStatus'>
                                <span className='sendTime'>{item.time}</span>
                                {item.isReaded ? <img alt='img' src={readed}/> : <img alt='img' src={unreaded}/> }
                            </div>

                            </div>
                            </div>
                            )
                        ))
                    }
                </div>

                <p className='istyping'>{status}</p>

           

            <span className={showEmojiPicker ? "emojiActive" : "emojiDisable"}>
                <Picker  data={data} onEmojiSelect={(e)=>{
                        setMessage((prev)=>{
                            return prev + e.native
                        })
                    }} />
            </span>
            
           
            <form className='sendmsg' onSubmit={sender}>
                <input className='enter' value={message} onKeyDown={isTyping} onChange={(e)=>{setMessage(e.target.value)}} name='text'  type="text"/>
                <img alt='img'  onClick={toggleEmojiPicker} className='imgEmoj' src={emojiIcn}/>
                <input type='submit' className='sendbtn' value=''/>
            </form>
        </div>
        :

        friendsList.length > 0 ? <div className='emptyMsg'></div> :   <div className='noresults'></div>
    )
}