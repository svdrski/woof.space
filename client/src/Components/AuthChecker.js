import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { useMyContext } from './UserDataContext';
const Checker = ({ children }) => {
  const [tokenValid, setTokenValid] = useState(false);
  const navigate = useNavigate();
  const {updateData} = useMyContext()
  const location = useLocation();

  const URL = process.env.REACT_APP_BASE_URL

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.post(`${URL}/auth`, null, {
            headers: {"Contet-Type" : "application/json",
            "Access-Control-Allow-Origin": "https://clientsite.onrender.com",
          },
            withCredentials: true
        } )
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