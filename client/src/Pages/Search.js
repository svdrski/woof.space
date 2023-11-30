import './Css/Search.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios';

import Header from '../Components/Header';
import SearchCard from '../Components/SearchCard';
import { useMyContext } from '../Components/UserDataContext';
import { useSearchContext } from '../Components/Context/SearchContext';
import RangeSlider from '../Components/AgeRange';
import MobileMenuContainer from '../Components/mobileMenuContainer';
import AutoCompleteBreed from '../Components/BreedAutocomplete';


const URL = process.env.REACT_APP_BASE_URL


export default function Search () {

    const navigate = useNavigate();


    const {userdata} = useMyContext()
    const { breed, setBreed,
        attempts, setAttempts,
        dogsList, setDogsList,
        currentDog, setCurrentDog,
        currentCount, setCount,
        rangeValues, setRangeValues,
        visibleFilters, setVisibleFilters} = useSearchContext ()



    useEffect(() => {
        setCurrentDog(dogsList[currentCount]);
    }, [dogsList, currentCount]);




    async function handlelike() {
        try{
            setCount((prevCount) => {
                setCurrentDog(dogsList[prevCount + 1]);
                return prevCount + 1;
            });
            setAttempts(attempts + 1)
            const regLike = await axios.post(`${URL}/like`, {user: userdata.email, opponent: currentDog.email} )
        } catch(e) {console.log('Error ', e)}
    }

    async function handledislike() {
        try{
            setCount((prevCount) => {
                setCurrentDog(dogsList[prevCount + 1]);
                return prevCount + 1;
            });
            setAttempts(attempts + 1)
            const regDislike = await axios.post(`${URL}/dislike`, {user: userdata.email, opponent: currentDog.email} )
        } catch(e) {console.log('Error ', e)}
    }



    // Update opponents list after filtering
    async function getUsers() {
        try{
            const users = await axios.post(`${URL}/search/users`,{gender: userdata.gender === 'boy' ? 'boy' : 'girl',  breed: breed && breed.breed, age: rangeValues, city:userdata.city }, {
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
                    <img className='previewImg' src={currentDog.photos[1] ? `${URL}/${currentDog.photos[1].slice(2, currentDog.photos[1].length)}` : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'}/>
                    <img className='previewImg' src={currentDog.photos[2] ? `${URL}/${currentDog.photos[2].slice(2, currentDog.photos[2].length)}` : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'}/>
                </div>
                <h3>Description</h3>
                <p>{currentDog.description}</p>
            </div>
            </>
           ) : <div className='noresultss'></div>}

        </div>
        <MobileMenuContainer/>
        </>
    )
}


