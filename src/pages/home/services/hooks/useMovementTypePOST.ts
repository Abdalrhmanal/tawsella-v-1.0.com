import { useMutation } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const useMovementTypePOST = () => {
  return useMutation(
    async (formData: {
      type: string;
      price: number;
      description: string;
      is_onKM: boolean;
      payment: string;
      is_general: boolean;
    }) => {
      const token = cookies.get('authToken');
      console.log(token);

      const response = await axios.post('https://tawsella.online/api/movement-types', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  );
};

export const useMovementTypePUT = () => {
    return useMutation(async (row: any) => {
        const token = cookies.get('authToken');
        console.log(token);

        const response = await axios.put(
            `https://tawsella.online/api/movement-types/${row.id}`, 
            row,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
            }
        );

        console.log('تم تعديل نوع الرحلة :', response.data);
        return response.data;
    });
};
