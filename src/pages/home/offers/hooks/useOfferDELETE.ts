import { useMutation } from 'react-query';
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useOfferDELETE = () => {
    return useMutation(async (row: any) => {
        const token = cookies.get('authToken');
<<<<<<< HEAD
        const response = await axios.delete(`https://tawsella.online/api/offers/${row.id}`, {
=======
        const response = await axios.delete(`http://127.0.0.1:8000/api/offers/${row.id}`, {
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
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
