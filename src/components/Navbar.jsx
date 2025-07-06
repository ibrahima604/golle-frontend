import React, { useState, useEffect } from "react";
import logo from "../assets/golle.png";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext"; // adapte le chemin si besoin
import { useContext } from "react";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
const { isLoggedIn, logout } = useContext(AuthContext); 

  const navigate = useNavigate();

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const handleLogout = () => {
  logout(); 
  navigate("/connexion");
};


  return (
    <nav className="h-20 fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center w-full">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Golle" className="w-16 h-16 object-contain rounded-full" />
          <span className="text-xl font-bold text-[#0F172A]">Golle</span>
        </div>

        {/* Menu principal - Desktop */}
        <ul className="hidden md:flex space-x-5 text-sm font-medium items-center text-[#0F172A] m-4">
          <li className="hover:text-[#F97316] cursor-pointer transition flex items-center space-x-1">
            <span>GollePro</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </li>
          <li className="hover:text-[#F97316] cursor-pointer transition flex items-center space-x-1">
            <span>Explorer</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </li>
          <li className="hover:text-[#F97316] cursor-pointer transition flex items-center space-x-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2c2.5 2.5 2.5 17.5 0 20M2 12c2.5-2.5 17.5-2.5 20 0" />
            </svg>
            <span>FR</span>
          </li>
          <li className="hover:text-[#F97316] cursor-pointer transition">Devenir vendeur</li>
          <li className="hover:text-[#F97316] cursor-pointer transition">Contact</li>
        </ul>

        {/* Actions - Desktop */}
        <div className="hidden md:flex space-x-3">
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/connexion")}
              className="px-4 py-1.5 border border-[#0F172A] rounded-md text-[#0F172A] hover:bg-[#F1F5F9] transition font-medium"
            >
              Connexion
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 border border-red-600 rounded-md text-red-600 hover:bg-red-100 transition font-medium"
            >
              Déconnexion
            </button>
          )}
        </div>

        {/* Menu burger (mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu mobile">
            <svg
              className="w-6 h-6 text-[#0F172A]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white shadow rounded-b m-4">
          <ul className="flex flex-col space-y-3 text-sm font-medium text-[#0F172A]">
            <li className="hover:text-[#F97316] cursor-pointer">GollePro</li>
            <li className="hover:text-[#F97316] cursor-pointer">Explorer</li>
            <li className="hover:text-[#F97316] cursor-pointer">FR</li>
            <li className="hover:text-[#F97316] cursor-pointer">Devenir vendeur</li>
            <li className="hover:text-[#F97316] cursor-pointer">Contact</li>
          </ul>

          <div className="mt-4 flex flex-col space-y-2">
            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/connexion")}
                className="w-full px-4 py-2 border border-[#0F172A] rounded text-[#0F172A] hover:bg-[#F1F5F9] transition"
              >
                Connexion
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 border border-red-600 rounded text-red-600 hover:bg-red-100 transition"
              >
                Déconnexion
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
