import axios from "axios";
import { useMutation } from "react-query";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useOfferPUT = () => {
    return useMutation(async (row: any) => {
        const token = cookies.get('authToken');
        console.log(token);

        const response = await axios.put(
<<<<<<< HEAD
            `https://tawsella.online/api/offers/${row.id}`, 
=======
            `http://127.0.0.1:8000/api/offers/${row.id}`, 
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
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
