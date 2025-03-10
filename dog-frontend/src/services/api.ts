const apiUrl = 'http://localhost:4000/api'; // API-endpoint

// Henter token fra localStorage
const getAuthToken = () => localStorage.getItem('auth-token');

// Hjelpefunksjon for å håndtere API-kall
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

// Hente alle hunder
export const getDogs = () => fetchWithAuth(`${apiUrl}/dogs`);

// Hente en spesifikk hund basert på ID
export const getDogById = (id: string) => fetchWithAuth(`${apiUrl}/dogs/${id}`);

// Opprette en ny hund
export const createDog = (dogData: any) =>
  fetchWithAuth(`${apiUrl}/dogs`, {
    method: 'POST',
    body: JSON.stringify(dogData),
  });

// Oppdatere en hund basert på ID
export const updateDog = (id: string, dogData: any) =>
  fetchWithAuth(`${apiUrl}/dogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dogData),
  });

// Slette en hund basert på ID
export const deleteDog = (id: string) =>
  fetchWithAuth(`${apiUrl}/dogs/${id}`, { method: 'DELETE' });

// Logge inn og motta token
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

// Registrere ny bruker
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

// Hente brukerdata
export const getUserData = () => fetchWithAuth(`${apiUrl}/me`);

// Sjekk om brukeren er innlogget
export const isAuthenticated = () => !!getAuthToken();
