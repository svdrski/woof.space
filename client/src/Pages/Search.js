
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { cookies } from '../App';
import axios from 'axios';
import Header from '../Components/Header';


export default function Search () {

    const navigate = useNavigate();









    return(
        <>
        <Header/>
        <h1 style={{color:"#fff"}}>Search</h1>
        </>
    )
}


