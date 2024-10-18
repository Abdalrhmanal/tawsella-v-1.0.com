import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { MovementTypeResponse } from '../type';

const cookies = new Cookies();

export const useMovementTypeGET = () => {
  return useQuery<MovementTypeResponse>('movement-types', async () => {
    const token = cookies.get('authToken');  
    console.log(token);
    
    const response = await axios.get<MovementTypeResponse>('https://tawsella.online/api/movement-types', {
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
      const response = await axios.delete(`https://tawsella.online/api/movement-types/${row.id}`, {
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
