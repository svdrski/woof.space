import { useEffect, useState, useRef } from 'react'
import socket from '../Components/Socket';
import { useMyContext } from '../Components/UserDataContext';
import { v4 as uuidv4 } from 'uuid';

const sendicon = import ('../Img/sendbtn.svg')

export default function ChatDialog({activefriend, roomId, messsages, setMessages}){


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
    }



    const isTyping = () => {
        socket.emit('typing', `${userdata.name} is typing...` )
    }

    

    return(
        <div className="chatFriends messageArea">

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