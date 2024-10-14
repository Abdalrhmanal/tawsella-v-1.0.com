import { useMutation } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { DriversResponse } from './type';

const cookies = new Cookies();

export const useDriverPOST = () => {
  return useMutation(async (driverData: {
    name: string;
    email: string;
    phone_number: string;
    gender: string;
    password: string;
    password_confirmation: string;
  }) => {
    const token = cookies.get('authToken');
    
    const response = await axios.post('http://127.0.0.1:8000/api/drivers', driverData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  });
};


export const useDriverPUT = () => {
  return useMutation<DriversResponse, Error, {
    driver_id: number;
    name?: string;
    email?: string;
    phone_number?: string;
    gender?: string;
  }>(async (DriverData) => {
    const token = cookies.get('authToken');
    const response = await axios.put<DriversResponse>(
      `http://127.0.0.1:8000/api/drivers/${DriverData.driver_id}`,
      DriverData,
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