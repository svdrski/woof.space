import './Css/Search.css'
import AutoCompleteBreed from '../Components/BreedAutocomplete';

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../Components/Header';
import SearchCard from '../Components/SearchCard';
import { useMyContext } from '../Components/UserDataContext';
import RangeSlider from '../Components/AgeRange';

export default function Search () {

    const {userdata} = useMyContext()


    const navigate = useNavigate();
    const [breed, setBreed] = useState(null)
    const [dogsList, setDogsList] = useState([])
    const [currentDog, setCurrentDog] = useState(null)
    const [currentCount, setCount] = useState(0)
    const [rangeValues, setRangeValues] = useState([0, 20]);



    useEffect(() => {
        setCurrentDog(dogsList[currentCount]);
    }, [dogsList, currentCount]);


    async function getUsers() {
        try{
            const users = await axios.post('http://localhost:3333/search/users',{gender: userdata.gender === 'boy' ? 'boy' : 'girl',  breed: breed && breed.breed, age: rangeValues}, {
                headers: {"Contet-Type" : "application/json"},
                withCredentials: true
            })
            console.log(users.data)
            setDogsList(users.data);

        } catch(e) {console.log('Error ', e)}
    }


    useEffect(()=>{
        getUsers()
    },[])




    async function showMatches () {
        try{
            const users = await axios.post('http://localhost:3333/search/matches',null, {
                headers: {"Contet-Type" : "application/json"},
                withCredentials: true
            })
            console.log(users.data)
        } catch(e) {console.log('Error ', e)}
    }




    async function handlelike() {

        setCount((prevCount) => {
            setCurrentDog(dogsList[prevCount + 1]);
            return prevCount + 1;
          });

        const regLike = await axios.post('http://localhost:3333/like', {user: userdata.email, opponent: currentDog.email} )



        console.log(currentDog.email)
        console.log(userdata.email)
    }


    async function handledislike() {
        setCount((prevCount) => {
            setCurrentDog(dogsList[prevCount + 1]);
            return prevCount + 1;
          });

          const regDislike = await axios.post('http://localhost:3333/dislike', {user: userdata.email, opponent: currentDog.email} )

    }





    return(
        <>
        <Header/>
        {/* <button onClick={()=>{console.log(dogsList)}}>FFF</button>
        <button onClick={()=>{console.log(currentDog)}}>FFF</button> */}


        <div className='blockContainer'>

           
           
           <div className='searchContainer'>
                <h2>Search in City</h2>
                <p className='attempts'>You made <b>33</b> attempts</p>
                <div className='filtersBox'>
                <h3>Filters</h3>
                <AutoCompleteBreed setFormData={setBreed} formData={breed}/>
                <label>Age</label>
                <div className='selectorAge'>
                <RangeSlider rangeValues={rangeValues} setRangeValues={setRangeValues}/>
                </div>
                <button onClick={getUsers} className='findbtn'>Find</button>
                </div>
            </div>

            {currentDog ? (
                <>
             <SearchCard data={currentDog} like={handlelike} dislike={handledislike}/>

            <div className='cardDescription'>
                <div className='images'>
                    <img className='previewImg' src={currentDog.photos[1] ? `http://localhost:3333/${currentDog.photos[1].slice(2, currentDog.photos[1].length)}` : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'}/>
                    <img className='previewImg' src={currentDog.photos[2] ? `http://localhost:3333/${currentDog.photos[2].slice(2, currentDog.photos[2].length)}` : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'}/>
                </div>
                <h3>Description</h3>
                <p>{currentDog.description}</p>
                <button onClick={showMatches}>SHowmatches</button>
            </div>
            </>
           ) : <div className='noresults'>                <button onClick={showMatches}>SHowmatches</button>
           </div>}

        </div>
        </>
    )
}


