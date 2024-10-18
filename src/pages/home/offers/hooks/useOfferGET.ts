import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useOfferGET = () => {
    return useQuery<OffersResponse>('offers', async () => {
        const token = cookies.get('authToken'); 
        console.log(token);
        const response = await axios.get<OffersResponse>('https://tawsella.online/api/offers', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });
        return response.data;
    });
};
