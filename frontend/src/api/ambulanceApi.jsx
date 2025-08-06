import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchAmbulanceData = async (token) => {
    try {
        const response = await fetch (`${API_BASE_URL}/api/ambulance`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
         
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error(`Gagal mengambil data monitoring ambulance:`, error.message);
        throw error;
    }
}

export const submitAmbulance = async (token, data) => {
    const response = await axios.post(
        `${API_BASE_URL}/api/ambulance`,
        data,
        {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        }
    )
    return response.data;
}

export const exportAmbulanceExcel = async (token) => {
    try {
        console.log('Token for export ambulance:', token);

        const response = await fetch(`${API_BASE_URL}/api/ambulance`, {
            method: 'GET',
            headers: {
                Authorization: `Beare ${token}`,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Gagal exports data ambulance: ${response.status} ${response.statusText}`);
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
}