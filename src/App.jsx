import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Connexion from './pages/Login'; // 🔥 nouvelle page
import Signup from './pages/SignupModal';   // 🔥 page d'inscription
import EmailVerification from "./pages/Emailverification";
import Dashboard from './pages/Dashboard';  // <-- importer le Dashboard

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Signup />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
