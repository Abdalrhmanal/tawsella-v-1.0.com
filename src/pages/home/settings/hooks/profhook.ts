import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// =============================
// Types
// =============================

interface ProfileResponse {
  message: string;
  data: {
    id: string;
    name: string;
    avatar: string;
    phone_number: string;
    email: string;
    gender: number; 
  };
}

export interface ProfilePostData {
  name: string;
  avatar?: File | string;
  phone_number: string;
  email: string;
  gender: number; // Add gender field here
}

// =============================
// useProfileGET - Hook to get Profile data
// =============================

export const useProfileGET = () => {
  return useQuery<ProfileResponse>('Profile', async () => {
    const token = cookies.get('authToken');
<<<<<<< HEAD
    const response = await axios.get<ProfileResponse>('https://tawsella.online/api/profile', {
=======
    const response = await axios.get<ProfileResponse>('http://127.0.0.1:8000/api/profile', {
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
// useProfilePOST - Hook to update Profile data
// =============================

export const useProfilePOST = () => {
  return useMutation<ProfileResponse, Error, FormData>(async (formData) => {
    const token = cookies.get('authToken');
<<<<<<< HEAD
    const response = await axios.post<ProfileResponse>('https://tawsella.online/api/profile', formData, {
=======
    const response = await axios.post<ProfileResponse>('http://127.0.0.1:8000/api/profile', formData, {
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data', // Since we're using FormData
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });
};
