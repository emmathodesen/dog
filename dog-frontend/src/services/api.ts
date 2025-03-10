const apiUrl = 'http://localhost:4000/api'; // API-endpoint

// gets token from localStorage
const getAuthToken = () => localStorage.getItem('auth-token');

// handles API-kall
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'API request failed');
  }

  return await response.json();
};

// gets all dogs
export const getDogs = () => fetchWithAuth(`${apiUrl}/dogs`);

// get dog buy id
export const getDogById = (id: string) => fetchWithAuth(`${apiUrl}/dogs/${id}`);

// make a new dog
export const createDog = (dogData: any) =>
  fetchWithAuth(`${apiUrl}/dogs`, {
    method: 'POST',
    body: JSON.stringify(dogData),
  });

// Update dog buy id
export const updateDog = (id: string, dogData: any) =>
  fetchWithAuth(`${apiUrl}/dogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dogData),
  });

// delete dog buy id
export const deleteDog = (id: string) =>
  fetchWithAuth(`${apiUrl}/dogs/${id}`, { method: 'DELETE' });

// Log in and receive token
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to log in');
  }

  const data = await response.json();
  if (data.token) {
    localStorage.setItem('auth-token', data.token);
  }

  return data;
};

// Register new user
export const registerUser = async (email: string, password: string) => {
  const response = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to register');
  }

  return await response.json();
};

// Fetch user data
export const getUserData = () => fetchWithAuth(`${apiUrl}/me`);

// check if user are logged in
export const isAuthenticated = () => !!getAuthToken();
