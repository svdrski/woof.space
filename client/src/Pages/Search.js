import './Css/Search.css'
import AutoCompleteBreed from '../Components/BreedAutocomplete';

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../Components/Header';
import SearchCard from '../Components/SearchCard';
import { useMyContext } from '../Components/UserDataContext';
import { useSearchContext } from '../Components/Context/SearchContext';
import RangeSlider from '../Components/AgeRange';
import MobileMenuContainer from '../Components/mobileMenuContainer';

export default function Search () {

    const {userdata} = useMyContext()
    const {            breed, setBreed,
        attempts, setAttempts,
        dogsList, setDogsList,
        currentDog, setCurrentDog,
        currentCount, setCount,
        rangeValues, setRangeValues,
        visibleFilters, setVisibleFilters} = useSearchContext ()


    const navigate = useNavigate();



    console.log('LIIST', dogsList)




    useEffect(() => {
        setCurrentDog(dogsList[currentCount]);
    }, [dogsList, currentCount]);


   




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
          setAttempts(attempts + 1)

        const regLike = await axios.post('http://localhost:3333/like', {user: userdata.email, opponent: currentDog.email} )

    }


    async function handledislike() {
        setCount((prevCount) => {
            setCurrentDog(dogsList[prevCount + 1]);
            return prevCount + 1;
          });

          setAttempts(attempts + 1)

          const regDislike = await axios.post('http://localhost:3333/dislike', {user: userdata.email, opponent: currentDog.email} )
    }

    async function getUsers() {
        try{
            const users = await axios.post('http://localhost:3333/search/users',{gender: userdata.gender === 'boy' ? 'boy' : 'girl',  breed: breed && breed.breed, age: rangeValues, city:userdata.city }, {
                headers: {"Contet-Type" : "application/json"},
                withCredentials: true
            })
            console.log(users.data)
            setDogsList(users.data);

        } catch(e) {console.log('Error ', e)}
    }







    return(
        <>
        <Header/>
        {/* <button onClick={()=>{console.log(dogsList)}}>FFF</button>
        <button onClick={()=>{console.log(currentDog)}}>FFF</button> */}


        <div className='blockContainer'>

           
           
           <div className='searchContainer'>
                <h2>Search in {userdata.city}</h2>
                <p className='attempts'>You made <b>{attempts}</b> attempts</p>
                <span onClick={()=>{setVisibleFilters(!visibleFilters)}} className='showFiltersbtn'>{visibleFilters ? 'Hide filters' : 'Show filters'}</span>

                <div className={`filterinputs ${visibleFilters ? 'filtervisible' : ''}`}>
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
                {/* <button onClick={showMatches}>SHowmatches</button> */}
            </div>
            </>
           ) : <div className='noresultss'>            
</div>}

        </div>

        <MobileMenuContainer/>
        </>
    )
}


