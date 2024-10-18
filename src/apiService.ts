/* import axios from 'axios';

<<<<<<< HEAD
const API_BASE_URL = 'https://tawsella.online/api';
 */
// apiService.ts
export async function fetchData(endpoint: string): Promise<any> {
    const response = await fetch(`https://tawsella.online/api${endpoint}`);
=======
const API_BASE_URL = 'http://https://tawsella.online/api';
 */
// apiService.ts
export async function fetchData(endpoint: string): Promise<any> {
    const response = await fetch(`http://https://tawsella.online/api${endpoint}`);
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  