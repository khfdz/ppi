// src/api/authMonitoring.js
export const fetchMonitoringData = async (token) => {
  try {
    const response = await fetch('http://localhost:6969/api/monitoring', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Gagal mengambil data monitoring:', error.message);
    throw error;
  }
};

export const submitMonitoring = async (token, data) => {
  const response = await axios.post(
    'http://localhost:6969/api/monitoring',
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
  return response.data;
};
