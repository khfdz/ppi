// import axios from 'axios';

// export const fetchIndikators = async (token) => {
//   const response = await axios.get('http://localhost:6969/api/indikator', {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data.data || [];
// };

// src/api/indikatorApi.js (atau file kamu sekarang)
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchIndikators = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/api/indikator`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data || [];
};
