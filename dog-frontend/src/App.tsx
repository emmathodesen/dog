import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DogForm from './components/DogForm';
import DogList from './components/DogList';
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import Register from './components/Register'; 
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar show on all pages */}

      <Routes>
        <Route path="/" element={<WelcomePage />} /> {/* Welcome page */}

        {/* Protect route */}
        <Route path="/dogs" element={<ProtectedRoute><DogList /></ProtectedRoute>} />
        <Route path="/create-dog" element={<ProtectedRoute><DogForm /></ProtectedRoute>} />
        <Route path="/dog/:id" element={<ProtectedRoute><DogForm /></ProtectedRoute>} /> {/* Updata a dog */}

        {/* Open route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Add to this route */}
      </Routes>
    </Router>
  );
};

export default App;
