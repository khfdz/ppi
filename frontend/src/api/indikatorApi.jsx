import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchIndikators = async (token, filter = {}) => {
  const params = new URLSearchParams();

  // Tambahkan filter jika ada
  if (filter.jenis) {
    params.append('jenis', filter.jenis);
  }

  const url = `${API_BASE_URL}/api/indikator${params.toString() ? `?${params.toString()}` : ''}`;

  // Debug log URL
  console.log("🔍 Request URL:", url);

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data.data || [];

  // Urutkan ASC
  return data.sort((a, b) => a.indikator_id - b.indikator_id);
};
