import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { RequestDataDTO } from 'pages/home/hooks/type';

const cookies = new Cookies();

export const useMovementCurrentGET = () => {
    return useQuery<RequestDataDTO>('taxi-movement/current', async () => {
        const token = cookies.get('authToken'); 
        console.log(token); 

<<<<<<< HEAD
        const response = await axios.get<RequestDataDTO>('https://tawsella.online/api/taxi-movement/current', {
=======
        const response = await axios.get<RequestDataDTO>('http://127.0.0.1:8000/api/taxi-movement/current', {
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });

        return response.data; 
    }, {
        retry: 1, // عدد مرات إعادة المحاولة في حال فشل الطلب
        refetchOnWindowFocus: false, // إيقاف جلب البيانات تلقائيًا عند التركيز على النافذة
    });
};

export const useMovementCompletedGET = () => {
    return useQuery<RequestDataDTO>('taxi-movement/completed', async () => {
        const token = cookies.get('authToken'); 
        console.log(token); 

<<<<<<< HEAD
        const response = await axios.get<RequestDataDTO>('https://tawsella.online/api/taxi-movement/completed', {
=======
        const response = await axios.get<RequestDataDTO>('http://127.0.0.1:8000/api/taxi-movement/completed', {
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });

        return response.data;
    }, {
        retry: 1, // عدد مرات إعادة المحاولة في حال فشل الطلب
        refetchOnWindowFocus: false, // إيقاف جلب البيانات تلقائيًا عند التركيز على النافذة
    });
};