import { useMutation } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const useOfferPOST = () => {
  return useMutation(
    async (offerData: {
      movement_type_id: string;
      offer: string;
      value_of_discount: number;
      valid_date: string;
      description: string;
    }) => {
      const token = cookies.get('authToken');
      console.log(token);

      const response = await axios.post('https://tawsella.online/api/offers', offerData, {
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
