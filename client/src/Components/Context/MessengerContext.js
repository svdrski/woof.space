import React, { createContext, useContext, useState } from 'react';


const MessengerContext = createContext()

export  function MessengerDataContext ({children}){

    const [matches, SetMatches] = useState([])
    const [friendsList, setFriendsList] = useState([])
    const [activefriend, setActivefriend] = useState(null)
    const [roomId, setRoomId] = useState('')
    const [messsages, setMessages] = useState([])
    const[lastMessages, setLastMessages] = useState([])
    const [hideOnmobile, sethideOnmobile] = useState(false)
    const [lastMsgAccept, setlastMsgAccept] = useState(false)
    const [acfriendAccept, setacfriendAccept] = useState(false)
    const [UnreadedMessages, setUnreadedMessages] = useState([])
    const [status, setStatus] = useState('')
    const [extraOpponent, setExtraOpponent] = useState({})



    return (
        <MessengerContext.Provider value={{
            matches, SetMatches,
            friendsList, setFriendsList,
            activefriend, setActivefriend,
            roomId, setRoomId,
            messsages, setMessages,
            lastMessages, setLastMessages,
            hideOnmobile, sethideOnmobile,
            lastMsgAccept, setlastMsgAccept,
            acfriendAccept, setacfriendAccept,
            UnreadedMessages, setUnreadedMessages,
            status, setStatus,
            extraOpponent, setExtraOpponent
            }}>
        {children}
        </MessengerContext.Provider>
    )


}

export const useMessengerContext = () => {
    return useContext(MessengerContext);
  };
