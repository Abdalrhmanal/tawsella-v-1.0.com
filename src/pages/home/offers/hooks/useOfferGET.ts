import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useOfferGET = () => {
    return useQuery<OffersResponse>('offers', async () => {
        const token = cookies.get('authToken'); 
        console.log(token);
<<<<<<< HEAD
        const response = await axios.get<OffersResponse>('https://tawsella.online/api/offers', {
=======
        const response = await axios.get<OffersResponse>('http://127.0.0.1:8000/api/offers', {
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });
        return response.data;
    });
};
