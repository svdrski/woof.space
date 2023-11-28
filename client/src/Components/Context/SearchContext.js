import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMyContext } from '../../Components/UserDataContext';


const SearchContext = createContext()


export  function SearchDataContext ({children}){
    const {userdata} = useMyContext()

   
    const [breed, setBreed] = useState(null)
    const [attempts, setAttempts] = useState(null)
    const [dogsList, setDogsList] = useState([])
    const [currentDog, setCurrentDog] = useState(null)
    const [currentCount, setCount] = useState(0)
    const [rangeValues, setRangeValues] = useState([0, 20]);
    const [visibleFilters, setVisibleFilters] = useState(false)


    useEffect(()=>{
        setAttempts(userdata.attempts)
    },[userdata])
    
    return (
        <SearchContext.Provider value={{
            breed, setBreed,
            attempts, setAttempts,
            dogsList, setDogsList,
            currentDog, setCurrentDog,
            currentCount, setCount,
            rangeValues, setRangeValues,
            visibleFilters, setVisibleFilters
            }}>
        {children}
        </SearchContext.Provider>
    )


}

export const useSearchContext = () => {
    return useContext(SearchContext);
  };
