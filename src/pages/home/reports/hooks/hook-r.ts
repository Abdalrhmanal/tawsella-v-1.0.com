import { useQuery } from 'react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';

interface DriverMovement {
    avatar: string;
    name: string;
    movementsCount: number;
    totalAmount: number;
}

interface ReportResponse {
    message: string;
    data: {
        numberOfMovements: number;
        numberOfCompletedMovements: number;
        numberOfRejectedMovements: number;
        numberOfCanceledMovements: number;
        totalAmount: number;
        driversMovements: DriverMovement[];
    };
}

const cookies = new Cookies();

export const useReportGET = () => {
    return useQuery<ReportResponse>('dashboard/report', async () => {
        const token = cookies.get('authToken');
        console.log(token);
        const response = await axios.get<ReportResponse>('https://tawsella.online/api/dashboard/report', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    });
};

/* {
    "message": "Successfully get data",
    "data": {
        "numberOfMovements": 0,
        "numberOfCompletedMovements": 0,
        "numberOfRejectedMovements": 0,
        "numberOfCanceledMovements": 0,
        "totalAmount": 0,
        "path": [
            {
                "latitude": 0,
                "longitude": 0
            }
        ],
        "driversMovements": []
    }
} 
    
خالد جاسم
7:13 م
['longitude' => $longitude, 'latitude' => $latitude]
TaxiLocation.admin_id
TaxiLocation
خالد جاسم
7:14 م
$data = [
            'driver_id' => $this->taxi->driver_id,
            'lat' => $this->taxi->last_location_latitude,
            'long' => $this->taxi->last_location_longitude
        ];

        if ($this->path) {
            $data = array_merge($data, ['path' => $this->path]);
        }
            */