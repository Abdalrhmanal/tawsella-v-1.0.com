import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// =============================
// Types
// =============================

interface Taxi {
  driver_id: string;
  car_name: string;
  lamp_number: string;
  plate_number: string;
  car_details: string;
  id: string;
}

interface TaxisResponse {
  message: string;
  data: Taxi[];
}

interface TaxiPostData {
  driver_id: string;
  car_name: string;
  lamp_number: string; 
  plate_number: string;
  car_details: string;
}

interface TaxiResponse {
  message: string;
  data: TaxiPostData;
}

interface TaxiUpdateData {
  id: string;
  driver_id: string;
  car_name: string;
  lamp_number: string;
  plate_number: string;
  car_details: string;
}

interface DeleteTaxiResponse {
  message: string;
}

// =============================
// useTaxiGET - Hook to get all taxis
// =============================

export const useTaxiGET = () => {
  return useQuery<TaxisResponse>('taxis', async () => {
    const token = cookies.get('authToken');
<<<<<<< HEAD
    const response = await axios.get<TaxisResponse>('https://tawsella.online/api/taxis', {
=======
    const response = await axios.get<TaxisResponse>('http://127.0.0.1:8000/api/taxis', {
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

// =============================
// useTaxiPOST - Hook to create a new taxi
// =============================

export const useTaxiPOST = () => {
  return useMutation(async (taxiData: TaxiPostData) => {
    const token = cookies.get('authToken');
<<<<<<< HEAD
    const response = await axios.post<TaxiResponse>('https://tawsella.online/api/taxis', taxiData, {
=======
    const response = await axios.post<TaxiResponse>('http://127.0.0.1:8000/api/taxis', taxiData, {
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

// =============================
// useTaxiPUT - Hook to update an existing taxi
// =============================

export const useTaxiPUT = () => {
  return useMutation(async (taxiData: TaxiUpdateData) => {
    const token = cookies.get('authToken');
    const response = await axios.put<TaxiResponse>(
<<<<<<< HEAD
      `https://tawsella.online/api/taxis/${taxiData.id}`,
=======
      `http://127.0.0.1:8000/api/taxis/${taxiData.id}`,
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
      taxiData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  });
};

// =============================
// useTaxiDELETE - Hook to delete an existing taxi
// =============================

export const useTaxiDELETE = () => {
  return useMutation(async (id: string) => {
    const token = cookies.get('authToken');
<<<<<<< HEAD
    const response = await axios.delete<DeleteTaxiResponse>(`https://tawsella.online/api/taxis/${id}`, {
=======
    const response = await axios.delete<DeleteTaxiResponse>(`http://127.0.0.1:8000/api/taxis/${id}`, {
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
