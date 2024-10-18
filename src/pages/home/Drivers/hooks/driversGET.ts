import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { DriversResponse } from './type';

const cookies = new Cookies();

export const useDriverAllGET = () => {
  return useQuery<DriversResponse>('users', async () => {
    const token = cookies.get('authToken');
    console.log(token);
<<<<<<< HEAD
    const response = await axios.get<DriversResponse>('https://tawsella.online/api/drivers', {
=======
    const response = await axios.get<DriversResponse>('http://127.0.0.1:8000/api/drivers', {
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });
};
