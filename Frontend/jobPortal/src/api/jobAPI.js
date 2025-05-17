import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;
console.log(`API_URL: ${API_URL}`);

export const postJob = async (jobData) => {
  const response = await axios.post(`${API_URL}/add-job`, jobData);
  return response.data;
};


export const getJobs = async (title = '', location = '') => {
  try {
    const response = await axios.get(`${API_URL}/get`, {
      params: { title, location },
    });
    console.log(`Response from getJobs: ${JSON.stringify(response.data)}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export const getJobById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    throw error;
  }
}