const API_URL = 'http://localhost:6969/api/auth/login';

export const loginUser = async (nama_unit, password) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nama_unit, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login gagal');
  }

  return await response.json();
};
