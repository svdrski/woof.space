import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileInfo from '../Components/ProfileInfo';
import Header from '../Components/Header';
import MobileMenuContainer from '../Components/mobileMenuContainer';

const URL = process.env.REACT_APP_BASE_URL

export default function FriendProfile (){

    const { id } = useParams();
    const [user, setUser] = useState('')




    const saver = async ()=>{
        const response =  await axios.post(`${URL}/profile/get/${id}`, null ,{
            headers: {"Contet-Type" : "application/json"},
            withCredentials: true
        })

        if(response.status === 200) {
            console.log(response.data)
            setUser(response.data)
        }
    }

    useEffect(()=>{
        saver()
    },[])

    console.log(user)


    return(
        <> 
        <Header/>
        {user._id && <ProfileInfo data={user}/>}
        <MobileMenuContainer/>
        </>
    )

}