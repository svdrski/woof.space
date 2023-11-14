import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Checker = ({ children }) => {
  const [tokenValid, setTokenValid] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {

    const checkTokenValidity = async () => {
      try {
        const response = await axios.post('http://localhost:3333/auth', null, {
            headers: {"Contet-Type" : "application/json"},
            withCredentials: true
        } )
        console.log(response)
        if (response.status === 201) {
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