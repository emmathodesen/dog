import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Bruker useNavigate i stedet for useHistory
import { createDog, updateDog } from '../services/api';

const DogForm = () => {
  const { id } = useParams<{ id?: string }>();  // Bruker useParams for å hente ID fra URL
  const navigate = useNavigate();  // Bruker useNavigate for navigasjon

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (id) {
      // Hent hunden basert på ID for oppdatering
      // fetchDogById(id) - Implementer denne funksjonen for å hente hunden
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dogData = { name, breed, age, description, imageURL };

    try {
      if (id) {
        await updateDog(id, dogData);  // Oppdater hunden hvis ID finnes
      } else {
        await createDog(dogData);  // Opprett en ny hund hvis ID ikke finnes
      }
      navigate('/dogs');  // Naviger til listen etter opprettelse/oppdatering
    } catch (error) {
      console.error('Error creating/updating dog:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Breed"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />
      <button type="submit">Save Dog</button>
    </form>
  );
};

export default DogForm;

