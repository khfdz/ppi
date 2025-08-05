import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchAmbulanceData = async (token) => {
    try {
        const response = await fetch (`${API_BASE_URL}/api/ambulance`, {
            headers: {
                Authorizatuin: `Bearer ${token}`,
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