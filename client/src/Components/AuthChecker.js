import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMyContext } from './UserDataContext';

const Checker = ({ children }) => {
  const [tokenValid, setTokenValid] = useState(false);
  const navigate = useNavigate();
  const {userdata, updateData} = useMyContext()


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

    checkTokenValidity();


  }, []);

  return tokenValid ? <>{children}</> : null;
};

export default Checker;