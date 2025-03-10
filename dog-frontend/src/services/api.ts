const apiUrl = 'http://localhost:4000/api'; // API-endepunkt

export const getDogs = async () => {
  const response = await fetch(`${apiUrl}/dogs`);
  if (!response.ok) {
    throw new Error('Failed to fetch dogs');
  }
  return await response.json();
};
