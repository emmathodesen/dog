import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DogForm from './components/DogForm';
import DogList from './components/DogList';
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import Register from './components/Register'; // Sørg for at du har importert Register her
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar vises på alle sider */}

      <Routes>
        <Route path="/" element={<WelcomePage />} /> {/* Velkomstside */}

        {/* Beskyttede ruter */}
        <Route path="/dogs" element={<ProtectedRoute><DogList /></ProtectedRoute>} />
        <Route path="/create-dog" element={<ProtectedRoute><DogForm /></ProtectedRoute>} />
        <Route path="/dog/:id" element={<ProtectedRoute><DogForm /></ProtectedRoute>} /> {/* For oppdatering av hund */}

        {/* Åpne ruter */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Legg til denne ruten */}
      </Routes>
    </Router>
  );
};

export default App;
