import React, { useState, useContext, useEffect, useRef } from 'react';
import logo from '../assets/golle.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { FaBell, FaEnvelope, FaHeart, FaBars } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const langRef = useRef();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/golle-frontend/connexion');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const LanguageSelector = () => (
    <div ref={langRef} className="relative cursor-pointer">
      <div onClick={() => setLangOpen(!langOpen)} className="flex items-center space-x-1">
        <span>🌐</span>
        <span>{i18n.language.toUpperCase()}</span>
      </div>
      {langOpen && (
        <ul className="absolute right-0 mt-2 bg-white border rounded-md shadow-md z-10 list-none">
          <li onClick={() => { i18n.changeLanguage('fr'); setLangOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Français</li>
          <li onClick={() => { i18n.changeLanguage('en'); setLangOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">English</li>
          <li onClick={() => { i18n.changeLanguage('pe'); setLangOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Pulaar</li>
        </ul>
      )}
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/golle-frontend/')}>
          <img src={logo} alt="Golle" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold text-gray-800 hidden md:inline mr-4">Golle</span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center w-full justify-end space-x-6 text-sm font-medium text-gray-700">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative w-full max-w-xl mx-auto">
              <input
                type="text"
                placeholder={t('navbar.search_placeholder')}
                className="w-full border rounded-full py-2 pl-4 pr-10 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <FiSearch className="absolute right-3 top-2.5 text-gray-500" />
            </div>
          </div>

          {isLoggedIn ? (
            <>
              <FaBell title="Notifications" className="hover:text-orange-500 cursor-pointer" />
              <FaEnvelope title="Messages" className="hover:text-orange-500 cursor-pointer" />
              <FaHeart title="Favoris" className="hover:text-orange-500 cursor-pointer" />

              <LanguageSelector />

              <span onClick={() => navigate('/golle-frontend/dashboard')} className="hover:text-orange-500 cursor-pointer font-medium">
                {t('navbar.orders')}
              </span>

              {/* Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <img
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  src="https://ui-avatars.com/api/?name=Ibrahima+D&background=0F172A&color=fff"
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-white border-2 rounded-full" />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                    <ul className="list-none py-1 text-sm text-gray-700">
                      <li onClick={() => navigate('/golle-frontend/profile')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{t('navbar.profile')}</li>
                      <li onClick={() => navigate('/golle-frontend/settings')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{t('navbar.settings')}</li>
                      <li onClick={handleLogout} className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer">{t('navbar.logout')}</li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <span className="hover:text-orange-500 cursor-pointer">{t('navbar.seller')}</span>
              <span className="hover:text-orange-500 cursor-pointer">{t('navbar.explore')}</span>
              <LanguageSelector />
              <span className="hover:text-orange-500 cursor-pointer">{t('navbar.contact')}</span>
              <button
                onClick={() => navigate('/golle-frontend/connexion')}
                className="px-4 py-1.5 border border-[#0F172A] rounded text-[#0F172A] hover:bg-[#F1F5F9] transition text-sm"
              >
                {t('navbar.login')}
              </button>
            </>
          )}
        </div>

        {/* Burger menu */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars className="w-5 h-5 text-[#0F172A]" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white shadow rounded-b">
          <ul className="list-none flex flex-col space-y-3 text-sm font-medium text-[#0F172A]">
            <li>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t('navbar.search_placeholder')}
                  className="w-full border rounded-full py-2 pl-4 pr-10 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <FiSearch className="absolute right-3 top-2.5 text-gray-500" />
              </div>
            </li>

            <li><LanguageSelector /></li>

            {isLoggedIn ? (
              <>
                <li onClick={() => navigate('/golle-frontend/dashboard')} className="hover:text-[#F97316] cursor-pointer">{t('navbar.orders')}</li>
                <li onClick={() => navigate('/golle-frontend/profile')} className="hover:text-[#F97316] cursor-pointer">{t('navbar.profile')}</li>
                <li onClick={() => navigate('/golle-frontend/settings')} className="hover:text-[#F97316] cursor-pointer">{t('navbar.settings')}</li>
                <li onClick={handleLogout} className="text-red-600 hover:text-red-500 cursor-pointer">{t('navbar.logout')}</li>
              </>
            ) : (
              <>
                <li className="hover:text-[#F97316] cursor-pointer">{t('navbar.seller')}</li>
                <li className="hover:text-[#F97316] cursor-pointer">{t('navbar.explore')}</li>
                <li className="hover:text-[#F97316] cursor-pointer">{t('navbar.contact')}</li>
                <li onClick={() => navigate('/golle-frontend/connexion')} className="hover:text-[#F97316] cursor-pointer">{t('navbar.login')}</li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
