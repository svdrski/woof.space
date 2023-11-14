
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { cookies } from '../App';
import axios from 'axios';

export default function Search () {

    const navigate = useNavigate();






    
    useEffect( ()=>{
        const myCookieValue = cookies.get('token');
        if(!myCookieValue) {return navigate('/login')}
        async function get() {
           const data = await axios.post('http://localhost:3333/user', null,  {
            headers: {"Contet-Type" : "application/json"},
            withCredentials: true
        })
           console.log(data.data[0])
        }
        get()
    }, [])


    return(
        <h1 style={{color:"#fff"}}>Search</h1>
    )
}