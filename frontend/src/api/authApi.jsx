import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/login`;

export const loginUser = async (nama_unit, password) => {
  try {
    const response = await axios.post(LOGIN_ENDPOINT, {
      nama_unit,
      password,
    });

    console.log('🔥 Respon login:', response.data);

    // Kembalikan langsung token dan user
    return response.data.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Login gagal. Silakan periksa nama unit dan password.';
    throw new Error(message);
  }
};
