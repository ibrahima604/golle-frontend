import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, User, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://127.0.0.1:8000/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => navigate('/login'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/golle-frontend/connexion');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-gray-600">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid mb-4"></div>
        <p className="text-lg font-medium text-[#0F172A]">
          {t('dashboard.loading')}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-10">
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t('dashboard.greeting', { prenom: user.prenom, nom: user.nom })}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <User className="text-orange-500 mb-2" />
            <h3 className="font-bold">{t('dashboard.profileTitle')}</h3>
            <p className="text-gray-600 text-sm">{t('dashboard.profileDesc')}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <Briefcase className="text-orange-500 mb-2" />
            <h3 className="font-bold">{t('dashboard.missionsTitle')}</h3>
            <p className="text-gray-600 text-sm">{t('dashboard.missionsDesc')}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <Mail className="text-orange-500 mb-2" />
            <h3 className="font-bold">{t('dashboard.messagesTitle')}</h3>
            <p className="text-gray-600 text-sm">{t('dashboard.messagesDesc')}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
