import { useMutation } from 'react-query';
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useOfferDELETE = () => {
    return useMutation(async (row: any) => {
        const token = cookies.get('authToken');
        const response = await axios.delete(`https://tawsella.online/api/offers/${row.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });
        console.log('تم حذف المستخدم:', response.data);
        return response.data; 
    });
};
