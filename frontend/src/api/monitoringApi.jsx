import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchMonitoringData = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/monitoring`, {
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
    `${API_BASE_URL}/api/monitoring`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
  return response.data;
};

export const exportMonitoringExcel = async (token) => {
  try {
    console.log('Token for export:', token); // Log dulu

    const response = await fetch(`${API_BASE_URL}/api/export`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // Penting
    });

    if (!response.ok) {
      throw new Error(`Gagal export: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'monitoring.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Export Excel gagal:', error);
    throw error;
  }
};
