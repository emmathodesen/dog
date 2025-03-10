import React, { useEffect, useState } from 'react';
import { getDogs } from '../services/api';

interface Dog {
  id: number;
  name: string;
  breed: string;
}

const DogList: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const data = await getDogs();
        setDogs(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dogs');
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Dog List</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            {dog.name} - {dog.breed}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DogList;
