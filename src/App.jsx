import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Connexion from './pages/Login'; // 🔥 nouvelle page
import Signup from './pages/SignupModal';   // 🔥 page d'inscription
import EmailVerification from "./pages/Emailverification";
import Dashboard from './pages/Dashboard';  // <-- importer le Dashboard
import PrivateRoute from './components/PrivateRoute';
import Accueil from "./pages/Accueil";
import Footer from "./components/Footer";
import Profile from "./components/Profile"; // 🔥 nouvelle page de profil

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/golle-frontend/connexion" element={<Connexion />} />
        <Route path="/golle-frontend/inscription" element={<Signup />} />
        <Route path="/golle-frontend/email-verification" element={<EmailVerification />} />
        <Route path="golle-frontend/" element={<Accueil/>}/>
        <Route
          path="/golle-frontend/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/golle-frontend/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
