import { useEffect } from 'react';
import axios from 'axios';
import { cookies } from '../App';

const useUserData = () => {
    
  useEffect(() => {
    const fetchData = async () => {
      const myCookieValue = cookies.get('token');
      if (!myCookieValue) {
      } else {
        try {
          const data = await axios.post('http://localhost:3333/user', null, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
          console.log(data.data[0]);
          // Дополнительные действия с данными, если нужно
        } catch (error) {
          console.error('Произошла ошибка при получении данных пользователя:', error);
          // Обработка ошибки, если необходимо
        }
      }
    };

    fetchData();
  }, []);
};

export default useUserData;