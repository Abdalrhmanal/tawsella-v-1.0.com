import axios from "axios";
import { useMutation } from "react-query";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useOfferPUT = () => {
    return useMutation(async (row: any) => {
        const token = cookies.get('authToken');
        console.log(token);

        const response = await axios.put(
            `https://tawsella.online/api/offers/${row.id}`, 
            row,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
            }
        );

        console.log('تم تعديل العرض:', response.data);
        return response.data;
    });
};
