import { useEffect, useState, useRef } from 'react'
import socket from '../Components/Socket';
import { useMyContext } from '../Components/UserDataContext';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const sendicon = import ('../Img/sendbtn.svg')

export default function ChatDialog({activefriend, roomId, messsages, setMessages, friendsList, setFriendsList}){


    const dialogRef = useRef(null);

    const {userdata} = useMyContext()

    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    useEffect(()=>{
        socket.on('response',(data) =>{
            console.log(data)
            setMessages([...messsages, data])
        } )
    },[socket, messsages])








    const isTyping = () => {
        socket.emit('typing', {roomId, message:`${userdata.name} is typing...` } )
    }
    

    useEffect(()=>{
        socket.on('respTyping', (data)=> setStatus(data))
        setTimeout(()=>{setStatus('')}, 3000)
    })





    useEffect(() => {
        if (dialogRef.current) {
          dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
        }
      }, [messsages]);


    const sender = (e) =>{
        e.preventDefault()
        if(message.trim() && activefriend) {
            socket.emit('message', {
                text: message,
                name: userdata.name,
                id: userdata.email,
                recipientEmail: activefriend.email,
                SocketID: socket.id,
                roomId: roomId
            })

        }
        setMessage('')
        console.log(message)
    }



 

    

    return(
        <div className="chatFriends messageArea">
            <div className='opponentData'>
                <div className='msgPhoto' style={{background: `url(http://localhost:3333/${activefriend?.photos[0].slice(2, activefriend.photos[0].length)})`}}></div>
                <h3>{activefriend?.name}</h3>
                <Link to='/profile'>show profile</Link>
            </div>

            <div className='dialogArea' ref={dialogRef}>
                {
                    messsages.map((item)=>(
                        item.name === userdata.name ? (
                        <div className='linemsg' key={uuidv4()}>
                        <div className='chatMsg msgSender'>
                            <p className='sender'>{userdata.name}</p>
                            <p>{item.text}</p>
                            <span className='sendTime'>09:20</span>
                        </div>
                        </div>
                        ) : (
                        <div className='linemsg' key={uuidv4()}>
                        <div className='chatMsg'>
                            <p className='enemy sender'>{item.name}</p>
                            <p>{item.text}</p>
                        <span className='sendTime'>09:20</span>
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
    )
}