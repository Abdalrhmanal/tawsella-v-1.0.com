import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { DashboardDetailseResponse, DashboardResponse } from './type';

const cookies = new Cookies();
const getAuthToken = () => cookies.get('authToken'); 

export const useDashboardGET = () => {
  return useQuery<DashboardResponse>('/dashboard', async () => {
    const token = getAuthToken();
    const response = await axios.get<DashboardResponse>('http://127.0.0.1:8000/api/dashboard', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });
};

export const useDashboardDetailseGET = ({ id }: { id: string; }, _p0: { enabled: boolean; }) => {
  return useQuery<DashboardDetailseResponse>(
    [`/dashboard/movement-details`, id],
    async () => {
      const token = getAuthToken();
      const response = await axios.get<DashboardDetailseResponse>(
        `http://127.0.0.1:8000/api/dashboard/movement-details/${id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    {
      enabled: !!id, 
    }
  );
};

export const useRejectPOST = ({ id }: { id: string }) => {
  return useMutation(
    async (Reject: { message?: string }) => {
      const token = getAuthToken();
      const response = await axios.post(`http://127.0.0.1:8000/api/taxi-movement/reject/${id}`, Reject, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log('Request rejected successfully:', data);
      },
      onError: (error) => {
        console.error('Error rejecting request:', error);
      },
    }
  );
};

export const useAcceptPOST = ({ id }: { id: string }) => {
  return useMutation(
    async (Accept: { driver_id: string }) => {
      const token = getAuthToken();
      const response = await axios.post(`http://127.0.0.1:8000/api/taxi-movement/accept/${id}`, Accept, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log('Request accepted successfully:', data);
      },
      onError: (error) => {
        console.error('Error accepting request:', error);
      },
    }
  );
};
