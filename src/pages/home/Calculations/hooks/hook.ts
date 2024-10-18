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
        const response = await axios.get<CalculationsDTO>('https://tawsella.online/api/calculations', {
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
        const response = await axios.delete(`https://tawsella.online/api/calculations/${row.driver_id}`, {
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
        const response = await axios.post(`https://tawsella.online/api/calculations/bring/${row.driver_id}`, {}, { 
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
