import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const getAuthToken = () => cookies.get('authToken');

// تعريف الواجهات
export interface CalculationsDTO {
    message: string;
    data: CalculationsData[];
}
export interface CalculationsData {
    driver_id: string;
    name: string | null;
    avatar: string | null;
    plate_number: string | null;
    today_account: number;
    all_account: number;
}

export const useCalculationsGET = () => {
    return useQuery<CalculationsDTO>('/calculations', async () => {
        const token = getAuthToken();
<<<<<<< HEAD
        const response = await axios.get<CalculationsDTO>('https://tawsella.online/api/calculations', {
=======
        const response = await axios.get<CalculationsDTO>('http://127.0.0.1:8000/api/calculations', {
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    });
};

export const useCalculationsDELETE = () => {
    return useMutation(async (row: { driver_id: string }) => {
        const token = getAuthToken();
<<<<<<< HEAD
        const response = await axios.delete(`https://tawsella.online/api/calculations/${row.driver_id}`, {
=======
        const response = await axios.delete(`http://127.0.0.1:8000/api/calculations/${row.driver_id}`, {
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });
        console.log('Delete calculations done:', response.data);
        return response.data; 
    });
};

export const useCalculationsPOST = () => {
    return useMutation(async (row: { driver_id: string }) => {
        const token = getAuthToken();
<<<<<<< HEAD
        const response = await axios.post(`https://tawsella.online/api/calculations/bring/${row.driver_id}`, {}, { 
=======
        const response = await axios.post(`http://127.0.0.1:8000/api/calculations/bring/${row.driver_id}`, {}, { 
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('Post calculations done:', response.data);
        return response.data;
    });
};
