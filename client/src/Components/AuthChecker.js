import React, { useContext, useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { useMyContext } from './UserDataContext';

const Checker = ({ children }) => {
  const [tokenValid, setTokenValid] = useState(false);
  const navigate = useNavigate();
  const {userdata, updateData} = useMyContext()
  const location = useLocation();

  

  useEffect(() => {


    const checkTokenValidity = async () => {
      try {
        const response = await axios.post('http://localhost:3333/auth', null, {
            headers: {"Contet-Type" : "application/json"},
            withCredentials: true
        } )
        // console.log(response.data)
        if (response.status === 201) {
          updateData(response.data)
          setTokenValid(true);
        } else {
          navigate('/login'); 
        }
      } catch (error) {
        navigate('/login');
      }
    };

    location.pathname !== '/' && checkTokenValidity();
    


  }, []);

  return location.pathname === '/' || tokenValid ? <>{children}</> : null;
};

export default Checker;