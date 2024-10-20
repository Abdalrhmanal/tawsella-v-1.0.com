import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// =============================
// Types
// =============================

export interface AboutusRecord {
  id: string;
  title: string;
  description: string;
  complaints_number: string;
  image: string | null;
}

export interface AdditionalInfo {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

export interface AboutusResponse {
  aboutUsRecords: AboutusRecord[];
  additional_info: AdditionalInfo[];
}

export interface AboutusPostData {
  title: string;
  description: string;
  complaints_number: string;
  image?: string;
}

export interface AboutusUpdateData extends AboutusPostData {
  id: string;
}

export interface DeleteAboutusResponse {
  message: string;
}

// Helper function to get the token
const getAuthToken = () => cookies.get('authToken');

// =============================
// useAboutusGET - Hook to get all Aboutus records
// =============================

export const useAboutusGET = () => {
  return useQuery<AboutusResponse>(
    'Aboutus',
    async () => {
      const token = getAuthToken();
      const response = await axios.get<AboutusResponse>('https://tawsella.online/api/about-us', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      onError: (error) => console.error('Error fetching Aboutus records:', error),
    }
  );
};

// =============================
// useAboutusPOST - Hook to create a new Aboutus record
// =============================

export const useAboutusPOST = () => {
  const queryClient = useQueryClient();

  return useMutation<AboutusResponse, Error, AboutusPostData>(
    async (AboutusData) => {
      const token = getAuthToken();
      const response = await axios.post<AboutusResponse>('https://tawsella.online/api/about-us/additonal/add', AboutusData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Aboutus');
      },
      onError: (error) => console.error('Error creating Aboutus record:', error),
    }
  );
};


// =============================
// useAboutusPUT - Hook to update an existing Aboutus record
// =============================

export const useAboutusPUT = () => {
  const queryClient = useQueryClient();

  return useMutation<AboutusResponse, Error, AboutusUpdateData, { previousData: AboutusResponse | undefined }>(
    async (AboutusData) => {
      const token = getAuthToken();
      const response = await axios.put<AboutusResponse>(
        `https://tawsella.online/api/about-us/${AboutusData.id}`,
        AboutusData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    {
      onMutate: async (updatedData) => {
        await queryClient.cancelQueries('Aboutus');
        
        const previousData = queryClient.getQueryData<AboutusResponse>('Aboutus');
        
        if (previousData) {
          queryClient.setQueryData('Aboutus', {
            ...previousData,
            aboutUsRecords: previousData.aboutUsRecords.map((record) =>
              record.id === updatedData.id ? { ...record, ...updatedData } : record
            ),
          });
        }
        // توضيح نوع context هنا
        return { previousData };
      },
      onError: (error, _, context) => {
        console.error('Error updating Aboutus record:', error);
        if (context?.previousData) {
          queryClient.setQueryData('Aboutus', context.previousData);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('Aboutus');
      },
    }
  );
};

// =============================
// useAboutusDELETE - Hook to delete an existing Aboutus record
// =============================

export const useAboutusDELETE = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteAboutusResponse, Error, string, { previousData: AboutusResponse | undefined }>(
    async (id) => {
      const token = getAuthToken();
      const response = await axios.delete<DeleteAboutusResponse>(`https://tawsella.online/api/about-us/delete/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      onMutate: async (deletedId) => {
        await queryClient.cancelQueries('Aboutus');
        
        const previousData = queryClient.getQueryData<AboutusResponse>('Aboutus');
        
        if (previousData) {
          queryClient.setQueryData('Aboutus', {
            ...previousData,
            aboutUsRecords: previousData.aboutUsRecords.filter((record) => record.id !== deletedId),
          });
        }
        // توضيح نوع context هنا
        return { previousData };
      },
      onError: (error, _, context) => {
        console.error('Error deleting Aboutus record:', error);
        if (context?.previousData) {
          queryClient.setQueryData('Aboutus', context.previousData);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('Aboutus');
      },
    }
  );
};