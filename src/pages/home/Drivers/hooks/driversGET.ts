import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { DriversResponse } from './type';

const cookies = new Cookies();

export const useDriverAllGET = () => {
  return useQuery<DriversResponse>('users', async () => {
    const token = cookies.get('authToken');
    console.log(token);
    const response = await axios.get<DriversResponse>('http://127.0.0.1:8000/api/drivers', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });
};
