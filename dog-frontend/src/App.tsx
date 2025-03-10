import React from 'react';
import DogList from './components/DogList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Welcome to the Dog App!</h1>
      <DogList />
    </div>
  );
};

export default App;

