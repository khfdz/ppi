import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchMedisData = async (token) => {
    try {
        const response = await fetch (`${API_BASE_URL}/api/medis`, {
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
        console.error(`Gagal mengambil data monitoring medis:`, error,message);
        throw error;
    }
}

export const submitMedis = async (token, data) => {
    const response = await axios.post(
        `${API_BASE_URL}/api/medis`,
        data,
        {
            headers: { Authorization: `Bearer ${token}`},
            withCredentials: true,
        }
    )
    return response.data;
}

export const exportMedisExcel = async (token) => {
    try {
        console.log(`Token for export medis:`, token);

        const response = await fetch(`${API_BASE_URL}/api/medis`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
        });

            if (!response.ok) {
                throw new Error(`Gagal exports data medis: ${response.status} ${response.statusText}`)
            }

    const blob = await response.blob();
    const url = windows.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Data Medis.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export Data Medis Menjadi Excel Gagal:', error)
            throw error;
        }
}
