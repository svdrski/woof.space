import './Css/Search.css'
import AutoCompleteBreed from '../Components/BreedAutocomplete';

import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { cookies } from '../App';
import axios from 'axios';
import Header from '../Components/Header';
import SearchCard from '../Components/SearchCard';

export default function Search () {

    const navigate = useNavigate();
    const [breed, setBreed] = useState('')

    const [currentDog, setCurrentDog] = useState({
        dogName: 'Chapa',
        age: '5',
        breed: 'Bulldog',
        city: 'City',
        img: 'http://localhost:3333/uploads/2d27f55f-41bb-4c96-9379-01b8fde64010brooke-cagle-Ntm4C2lCWxQ-unsplash.jpg',
        description: 'Energetic and friendly Labrador Retriever named Bailey is seeking a playful companion for active walks and fun adventures. Enjoys attention, loves toys, and is always ready for new friendships with other four-legged pals!'
    })




    useEffect(()=>{
        async function getUsers() {
            const users = await axios.get('http://localhost:3333/users')
            console.log(users)

        }
        getUsers()
    },[])


    return(
        <>
        <Header/>
        <div className='blockContainer'>

            <div className='searchContainer'>
                <h2>Search in City</h2>
                <p className='attempts'>You made <b>33</b> attempts</p>
                <div className='filtersBox'>
                <h3>Filters</h3>
                <AutoCompleteBreed setFormData={setBreed} formData={breed}/>
                <label>Age</label>
                <div className='selectorAge'>
                </div>
                <button className='findbtn'>Find</button>
                </div>
            </div>

             <SearchCard data={currentDog}/>

            <div className='cardDescription'>
                <div className='images'>
                    <img className='previewImg' src={currentDog.img}/>
                    <img className='previewImg' src={currentDog.img}/>
                </div>


                <h3>Description</h3>
                <p>{currentDog.description}</p>
            </div>



        </div>
        </>
    )
}


