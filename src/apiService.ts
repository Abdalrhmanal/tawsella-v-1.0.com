/* import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
 */
// apiService.ts
export async function fetchData(endpoint: string): Promise<any> {
    const response = await fetch(`http://127.0.0.1:8000/api${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  