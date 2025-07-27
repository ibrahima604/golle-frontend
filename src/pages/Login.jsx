import React, { useState, useContext } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/golle.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import { useTranslation } from "react-i18next";

const Connexion = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/golle-frontend/login", {
        email,
        password,
      });

      login(res.data.token);
      navigate("/golle-frontend/dashboard");
    } catch (err) {
      console.error("Erreur complète :", err);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(t("connexion.error"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2 mt-13">
      <div className="w-[400px] max-w-md bg-white shadow-xl rounded-xl p-4">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo Golle" className="w-20 h-20 rounded-full" />
        </div>

        <h2 className="text-2xl font-bold text-center text-[#0F172A] mb-6">
          {t("connexion.title")}
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder={t("connexion.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder={t("connexion.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
              loading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#F97316] hover:bg-orange-600 text-black"
            }`}
          >
            {loading ? (
              <>
                <span className="h-5 w-5 border-2 border-t-2 border-t-[#F97316] border-gray-300 rounded-full animate-spin"></span>
                {t("connexion.loading")}
              </>
            ) : (
              t("connexion.button")
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-sm text-gray-400">{t("connexion.or")}</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={() => alert("Connexion via Google")}
          className="w-full flex items-center justify-center space-x-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm font-semibold text-gray-700">
            {t("connexion.google")}
          </span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          {t("connexion.noAccount")}{" "}
          <button
            onClick={() => navigate("/golle-frontend/inscription")}
            className="text-[#F97316] font-semibold hover:underline"
          >
            {t("connexion.signup")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Connexion;
