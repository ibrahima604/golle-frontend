import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Tag, Mail, Edit3, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    axios
      .get('http://localhost:8000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setUser(res.data);
        setFormData({
          nom: res.data.nom || '',
          prenom: res.data.prenom || '',
          email: res.data.email || '',
        });
      })
      .catch(() => {
        setError(t('profile.unauthorized'));
        navigate('/login');
      });
  }, [navigate, t]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await axios.put(
        'http://localhost:8000/api/profile',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setEditMode(false);
      setError(null);
    } catch {
      setError(t('profile.update_error'));
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p className="text-red-600 text-center mt-10 font-semibold">{error}</p>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-[#A45B29]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#F4A261] border-solid mb-4"></div>
        <p className="text-xl font-semibold tracking-wide">{t('profile.loading_profile')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-gradient-to-br from-[#F4A261] to-[#E76F51] rounded-3xl shadow-xl text-white font-sans">
      <h2 className="text-3xl font-extrabold mb-8 tracking-wide drop-shadow-lg text-center flex items-center justify-center gap-3">
        <User size={32} />
        {t('profile.my_profile')}
      </h2>

      {!editMode ? (
        <div className="space-y-5">
          <div className="flex justify-between border-b border-white/40 pb-2 items-center">
            <div className="flex items-center gap-2">
              <Tag size={20} />
              <span className="font-semibold uppercase tracking-widest">{t('profile.last_name')}</span>
            </div>
            <span className="italic">{user.nom}</span>
          </div>
          <div className="flex justify-between border-b border-white/40 pb-2 items-center">
            <div className="flex items-center gap-2">
              <User size={20} />
              <span className="font-semibold uppercase tracking-widest">{t('profile.first_name')}</span>
            </div>
            <span className="italic">{user.prenom}</span>
          </div>
          <div className="flex justify-between border-b border-white/40 pb-6 items-center">
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <span className="font-semibold uppercase tracking-widest">{t('profile.email')}</span>
            </div>
            <span className="italic lowercase">{user.email}</span>
          </div>

          <button
            onClick={() => setEditMode(true)}
            className="w-full bg-white text-[#E76F51] font-bold rounded-full py-3 shadow-md hover:shadow-lg hover:bg-white/90 transition duration-300 flex justify-center items-center gap-2"
            aria-label={t('profile.edit_profile')}
          >
            <Edit3 size={20} />
            {t('profile.edit_profile')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/20 rounded-2xl p-6 shadow-lg backdrop-blur-md">
          <div className="flex justify-between items-center border-b border-white/40 pb-3">
            <label htmlFor="nom" className="flex items-center gap-2 font-semibold uppercase tracking-widest text-white">
              <Tag size={20} />
              {t('profile.last_name')}
            </label>
            <input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-2/3 rounded-lg px-4 py-2 text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-[#F4A261]"
              type="text"
              autoComplete="off"
            />
          </div>

          <div className="flex justify-between items-center border-b border-white/40 pb-3">
            <label htmlFor="prenom" className="flex items-center gap-2 font-semibold uppercase tracking-widest text-white">
              <User size={20} />
              {t('profile.first_name')}
            </label>
            <input
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              className="w-2/3 rounded-lg px-4 py-2 text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-[#F4A261]"
              type="text"
              autoComplete="off"
            />
          </div>

          <div className="flex justify-between items-center border-b border-white/40 pb-3">
            <label htmlFor="email" className="flex items-center gap-2 font-semibold uppercase tracking-widest text-white">
              <Mail size={20} />
              {t('profile.email')}
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-2/3 rounded-lg px-4 py-2 text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-[#F4A261]"
              type="email"
              autoComplete="off"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-[#E76F51] font-bold px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-white/90 transition duration-300 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? t('profile.saving') : t('profile.save')}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setFormData({ nom: user.nom, prenom: user.prenom, email: user.email });
                setError(null);
              }}
              className="bg-white text-[#E76F51] font-semibold hover:text-white/80 flex items-center gap-1"
            >
              <XCircle size={18} />
              {t('profile.cancel')}
            </button>
          </div>

          {error && <p className="text-yellow-200 font-semibold mt-4">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Profile;
