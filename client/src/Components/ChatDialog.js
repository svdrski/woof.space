import { useEffect, useState, useRef, useCallback} from 'react'
import socket from '../Components/Socket';
import { useMyContext } from '../Components/UserDataContext';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import readed from '../Img/readed.svg'
import unreaded from '../Img/unread.svg'

const sendicon = import ('../Img/sendbtn.svg')

export default function ChatDialog({activefriend,acfriendAccept, lastMsgAccept, roomId, messsages, setMessages, friendsList, setFriendsList, lastMessages, setLastMessages, UnreadedMessages, setUnreadedMessages}){


    const dialogRef = useRef(null);

    const {userdata} = useMyContext()

    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')



    /// 1.  Send Message 
    const sender = (e) =>{
        e.preventDefault()

            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, '0');
            const minutes = currentTime.getMinutes().toString().padStart(2, '0');
            const time = `${hours}:${minutes}`;
            const newTextValue = e.target.text.value

            newTextValue.length > 0 && socket.emit('message', {
                text: e.target.text.value,
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
                    ? { ...item, text: newTextValue }
                    : item
            );
        });
            e.target.text.value = ''

        socket.emit('updateOppDialogPrev', {message, id:activefriend.email, opponent: userdata.email })

        
    }




    // /2 cath message
    useEffect(()=>{
        socket.on('response', async (data) =>{
            console.log('ЗДЕСЬ',activefriend)


            await setMessages((prevMessages) => [...prevMessages, data]);
            
            setFriendsList((prev)=>{
                return prev.map(item => item)
            })

            ////???????????????
            activefriend &&  UnreadedMessages.length &&  setUnreadedMessages((prev)=>{
                console.log('3')
                return prev.map(msg => msg.id === activefriend?.email ? {...msg, isReaded: true} : msg)
            })
        } )
    },[])

    

    // useEffect(() => {
    //     const handleResponse = async (data) => {
    //         console.log('ЗДЕСЬ', activefriend);
    
    //         await setMessages((prevMessages) => [...prevMessages, data]);
    
    //         setFriendsList((prev) => prev.map((item) => item));
    
    //         ////???????????????
    //         activefriend &&
    //             UnreadedMessages.length &&
    //             setUnreadedMessages((prev) => {
    //                 console.log('3');
    //                 return prev.map((msg) => (msg.id === activefriend?.email ? { ...msg, isReaded: true } : msg));
    //             });
    //     };
    
    //     socket.on('response', handleResponse);
    
    //     return () => {
    //         // Очищаем обработчик при размонтировании компонента или изменении activefriend
    //         socket.off('response', handleResponse);
    //     };
    // }, [activefriend, setMessages, setFriendsList, setUnreadedMessages]);


    
  

//3 call to get last Message to preview
useEffect(()=>{
    lastMsgAccept && friendsList.length > 0 && getLastMessages()
},[lastMsgAccept])


//4 Function to call last messages
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

// useEffect(()=>{
//     getLastMessages()
// },[])

//5 update last massages after response 

useEffect(()=>{
    socket.on('lastMsgList',(data)=>{
        setLastMessages((prev) => {
            return [...prev, ...data];
        })
        console.log('lastMsgList', data)
    })
},[])


// 6 Update opponent last messages 


const handleUpdateLastMessage = useCallback((data) => {
    console.log('updateLastMessage', activefriend, data);



    if (activefriend && data?.opponent === activefriend?.email) {
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

useEffect(() => {
    socket.on('updateLastMessage', handleUpdateLastMessage);
    return () => {
        socket.off('updateLastMessage', handleUpdateLastMessage);
    };
}, [handleUpdateLastMessage]);




    





//


    //!!!!!!!!!

    // useEffect(() => {
    //     socket.on('response', (data) => {
    //         setMessages((prevMessages) => [...prevMessages, data]);
    //         setForceUpdate((prev) => !prev); // изменение флага
    //     });
    // }, [socket, setMessages]);





    const isTyping = () => {
        console.log("TYPING")
        socket.emit('typing', {roomId, message:`${userdata.name} is typing...` } )
    }
    

    useEffect(()=>{
        socket.on('respTyping', (data)=> {

            console.log("TYPI22NG")
            setStatus(data)
            })
    
            setTimeout(()=>{
                console.log('STATUS')
                setStatus('')
            }, 2000)
    },[status])

 




 









    // useEffect(()=>{
    //     socket.on('makeReaded',(data)=>{
    //         console.log('makeReaded',activefriend, data)
    
            
    //         if(activefriend){
        
    
    //             console.log("NONNONONO", activefriend.email === data.opponent)
    
    //             if(activefriend && activefriend.email === data.opponent) {
            
    //                 setTimeout(()=>{
    //                     setMessages((prev)=>{
    //                         return prev.map(item =>  ({...item, isReaded :true}))
    //                     })
                        
    //                     socket.emit('uploadToDbMsgDialog', {room: roomId, user: activefriend?.email, opponent: userdata.email})
    //                 }, 400)
    //             }
    //         }
    
    
    //     })
    // },[]) 



//    обновить сообщения если у обоих открыты диалоги

   useEffect(() => {
    const handleMakeReaded = (data) => {
        console.log('makeReaded', activefriend, data);

        if (activefriend && activefriend.email === data.opponent) {
            setTimeout(() => {
                setMessages((prev) => {
                    return prev.map((item) => ({ ...item, isReaded: true }));
                });

                console.log("SAAVEED", roomId)
                socket.emit('uploadToDbMsgDialog', { room: roomId, user: activefriend?.email, opponent: userdata.email });
            }, 400);
        }
    };

    socket.on('makeReaded', handleMakeReaded);

    return () => {
        // Очищаем обработчик при размонтировании компонента или изменении activefriend
        socket.off('makeReaded', handleMakeReaded);
    };
}, [activefriend, setMessages, roomId, userdata.email, socket]);

 









useEffect(()=>{
    socket.on('finisgMsgUpdate', (data) => {
        console.log("HUINA");
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
                <input className='enter' onKeyDown={isTyping} name='text'  type="text"/>

                <input type='submit' className='sendbtn' value=''/>
            </form>
            {/* <button onClick={()=>{console.log(activefriend, UnreadedMessages, lastMessages)}}>freind</button> */}
        </div>
        :

        <div className='emptyMsg'></div>
    )
}