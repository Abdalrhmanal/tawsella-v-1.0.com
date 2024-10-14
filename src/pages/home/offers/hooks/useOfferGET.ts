import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useOfferGET = () => {
    return useQuery<OffersResponse>('offers', async () => {
        const token = cookies.get('authToken'); 
        console.log(token);
        const response = await axios.get<OffersResponse>('http://127.0.0.1:8000/api/offers', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });
        return response.data;
    });
};
