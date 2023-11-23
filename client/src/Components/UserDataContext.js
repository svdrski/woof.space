import React, { createContext, useContext, useState } from 'react';


const UserContext = createContext()

export  function UserDataContext ({children}){

    const [userdata, setUserData] = useState([])



    const updateData = (data) => {
        setUserData(data)
    }

    return (
        <UserContext.Provider value={{userdata, updateData}}>
        {children}
        </UserContext.Provider>
    )


}

export const useMyContext = () => {
    return useContext(UserContext);
  };
