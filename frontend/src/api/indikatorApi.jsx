import axios from 'axios';

export const fetchIndikators = async (token) => {
  const response = await axios.get('http://localhost:6969/api/indikator', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data || [];
};
