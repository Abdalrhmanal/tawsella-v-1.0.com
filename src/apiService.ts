/* import axios from 'axios';

const API_BASE_URL = 'https://tawsella.online/api';
 */
// apiService.ts
export async function fetchData(endpoint: string): Promise<any> {
    const response = await fetch(`https://tawsella.online/api${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  