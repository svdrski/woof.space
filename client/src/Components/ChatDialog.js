import { useEffect, useState, useRef } from 'react'
import socket from '../Components/Socket';
import { useMyContext } from '../Components/UserDataContext';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import readed from '../Img/readed.svg'
import unreaded from '../Img/unread.svg'

const sendicon = import ('../Img/sendbtn.svg')

export default function ChatDialog({activefriend, roomId, messsages, setMessages, friendsList, setFriendsList, lastMessages, setLastMessages, UnreadedMessages, setUnreadedMessages}){


    const dialogRef = useRef(null);

    const {userdata} = useMyContext()

    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')



    
    useEffect(()=>{
        socket.on('response', async (data) =>{
            
          

            await setMessages([...messsages, data])

            setFriendsList((prev)=>{
                return prev.map(item => item)
            })

            activefriend &&  UnreadedMessages.length &&  setUnreadedMessages((prev)=>{
                return prev.map(msg => msg.id === activefriend?.email ? {...msg, isReaded: true} : msg)
            })

            
        } )
        

    },[socket, messsages])






    const isTyping = () => {
        socket.emit('typing', {roomId, message:`${userdata.name} is typing...` } )
    }
    

    useEffect(()=>{
        socket.on('respTyping', (data)=> setStatus(data))
        setTimeout(()=>{setStatus('')}, 5000)
    })





    useEffect(() => {
        if (dialogRef.current) {
          dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
        }
      }, [messsages]);


    const sender = (e) =>{
        e.preventDefault()
        if(message.trim() && activefriend) {

            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, '0');
            const minutes = currentTime.getMinutes().toString().padStart(2, '0');
            const time = `${hours}:${minutes}`;
            socket.emit('message', {
                text: message,
                name: userdata.name,
                id: userdata.email,
                recipientEmail: activefriend.email,
                SocketID: socket.id,
                roomId: roomId,
                time
            })
        }

        setMessage('')

        console.log('1', lastMessages, '2', activefriend.email)
        socket.emit('updateOppDialogPrev', {message, id:activefriend.email, opponent: userdata.email })

    }




    socket.on('updateLastMessage', (data)=>{
        setLastMessages((prev)=>{
                return  prev.map(item => 
                    // item.recipientEmail === data.id || item.id === data.id 
                    item.roomId === [userdata.email, data.opponent].sort().join('')
                    ? {...item, text:data.text} : item)
        })
        // console.log('prev>',data )

        if(data?.opponent === activefriend?.email){
            socket.emit('readedNow', {opponent: data.opponent, room:roomId, user: userdata.email} )
        }
    })






   //обновить сообщения если у обоих открыты диалоги
   useEffect(()=>{
    socket.on('makeReaded',(data)=>{

       
        console.log(activefriend?.email , data.opponent)


        if(activefriend?.email === data.opponent) {

            setTimeout(()=>{
                setMessages((prev)=>{
                    return prev.map(item =>  ({...item, isReaded :true}))
                })
                
                socket.emit('uploadToDbMsgDialog', {room: roomId, user: activefriend?.email, opponent: userdata.email})
            }, 400)
           
        }

    })
},[socket, messsages])



useEffect(()=>{
    socket.on('finisgMsgUpdate', (data)=>{
        console.log("HUINA")
        // if(activefriend?.email === data.opponent) {
        //     setMessages((prev)=>{
        //         return prev.map(item =>  ({...item, isReaded :true}))
        //     })
        // }
    })
},[])








    function getLastMessages(){
        const friendsEmails  = []
        for (let item of friendsList) {
            const id = [userdata.email, item.email].sort().join('')
            friendsEmails.push(id)
        }
        socket.emit('getLastMessages', friendsEmails)
        socket.on('lastMsgList',(data)=>{
            setLastMessages(data)
        })
    }


    useEffect(()=>{
        getLastMessages()
    },[friendsList])

    

    return(
        activefriend ?
        <div className="chatFriends messageArea">
            <div className='opponentData'>
                <div className='msgPhoto' style={{background: `url(http://localhost:3333/${activefriend?.photos[0].slice(2, activefriend.photos[0].length)})`}}></div>
                {friendsList.find(item => item?.email === activefriend?.email)?.isOnline && <span className='isOnline onlnstaus'></span>}

                <h3>{activefriend?.name}</h3>
                <Link to='/profile'>show profile</Link>
            </div>



                
                <div className='dialogArea' ref={dialogRef}>
                    {
                        messsages.map((item)=>(
                            item.name === userdata.name ? (
                            <div className='linemsg' key={uuidv4()}>
                            <div className='chatMsg msgSender'>
                                {/* <p className='sender'>{userdata?.name}</p> */}
                                <p>{item.text}</p>
                                <div className='flexStatus'>
                                    <span className='sendTime'>{item.time}</span>
                                    {item.isReaded ? <img src={readed}/>  : <img src={unreaded}/> }
                                </div>

                            </div>
                            </div>
                            ) : (
                            <div className='linemsg' key={uuidv4()}>
                            <div className='chatMsg'>
                                {/* <p className='enemy sender'>{item?.name}</p> */}
                                <p>{item?.text}</p>
                            
                            <div className='flexStatus'>
                                <span className='sendTime'>{item.time}</span>
                                {item.isReaded ? <img src={readed}/> : <img src={unreaded}/> }
                            </div>

                            </div>
                            </div>
                            )
                        ))
                    }
                </div>

                <p className='istyping'>{status}</p>

           


            <form className='sendmsg' onSubmit={sender}>
                <input value={message} onKeyDown={isTyping} onChange={(e)=>{setMessage(e.target.value)}} type="text"/>
                <button className='sendbtn'></button>
            </form>
        </div>
        :

        <div className='emptyMsg'></div>
    )
}