import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { MovementTypeResponse } from '../type';

const cookies = new Cookies();

export const useMovementTypeGET = () => {
  return useQuery<MovementTypeResponse>('movement-types', async () => {
    const token = cookies.get('authToken');  
    console.log(token);
    
<<<<<<< HEAD
    const response = await axios.get<MovementTypeResponse>('https://tawsella.online/api/movement-types', {
=======
    const response = await axios.get<MovementTypeResponse>('http://127.0.0.1:8000/api/movement-types', {
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

export const useMovementTypeDELETE = () => {
  return useMutation(async (row: any) => {
      const token = cookies.get('authToken');
<<<<<<< HEAD
      const response = await axios.delete(`https://tawsella.online/api/movement-types/${row.id}`, {
=======
      const response = await axios.delete(`http://127.0.0.1:8000/api/movement-types/${row.id}`, {
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
          },
      });
      console.log('تم حذف نوع رحلة :', response.data);
      return response.data; 
  });
};
