import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';


import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaUserCircle,
  FaTimesCircle,
} from "react-icons/fa";
import logo from "../assets/golle.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Critères de mot de passe
  const passwordCriteria = {
    minLength: {
      label: "Minimum 8 caractères",
      isValid: password.length >= 8,
    },
    hasUpperCase: {
      label: "Une lettre majuscule",
      isValid: /[A-Z]/.test(password),
    },
    hasLowerCase: {
      label: "Une lettre minuscule",
      isValid: /[a-z]/.test(password),
    },
    hasDigit: {
      label: "Un chiffre",
      isValid: /\d/.test(password),
    },
    hasSpecialChar: {
      label: "Un caractère spécial (@$!%*?)",
      isValid: /[@$!%*?&!#^()_+=-]/.test(password),
    },
  };

  const isPasswordValid = Object.values(passwordCriteria).every(
    (item) => item.isValid
  );
  const totalCriteria = Object.keys(passwordCriteria).length;
  const validCount = Object.values(passwordCriteria).filter((c) => c.isValid).length;
  const progressPercentage = (validCount / totalCriteria) * 100;
  //fonction de validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      Swal.fire({
        icon: 'error',
        title: 'Mot de passe invalide',
        text: 'Le mot de passe ne respecte pas tous les critères requis.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les mots de passe ne correspondent pas.',
      });
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        prenom: firstName,
        nom: lastName,
        email: email,
        password: password,
      });

      localStorage.setItem("token", response.data.token);

      console.log("Réponse du backend :", response.data);

      Swal.fire({
        icon: 'success',
        title: 'Compte créé avec succès !',
        text: 'Veuillez vérifier votre e-mail avant de vous connecter.',
        confirmButtonText: 'Vérifier mon e-mail',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/email-verification"); // redirige vers la page de vérification
        }
      });

    } catch (error) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        Swal.fire({
          icon: 'error',
          title: 'Erreur de validation',
          html: Object.values(errors).join('<br>'),
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Une erreur s’est produite.",
        });
        console.log("Erreur attrapée :", error.response?.data);
      }

    }
    finally {
      setLoading(false);
    }
  };


  //Pour vider le formulaire0
  const vider = () => {
    setLastName('');
    setEmail('')
    setFirstName('')
    setPassword('')
    setConfirmPassword('')
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-12">
      <div className="w-[400px] max-w-md bg-white shadow-L rounded-xl p-6">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo Golle" className="w-20 h-20 rounded-full" />
        </div>

        <h2 className="text-2xl font-bold text-center text-[#0F172A] mb-6">
          Créer un compte chez  Golle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="relative">
            <FaUserCircle className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Affichage dynamique des critères non remplis */}
            {password.length > 0 && (
              <>
                <ul className="mt-2 text-sm text-gray-700 space-y-1 pl-1">
                  {Object.entries(passwordCriteria).map(
                    ([key, { label, isValid }]) =>
                      !isValid && (
                        <li key={key} className="flex items-center gap-2">
                          <FaTimesCircle className="text-red-500" />
                          {label}
                        </li>
                      )
                  )}
                </ul>

                {/* Barre de progression */}
                <div className="mt-2">
                  <div className="h-2 w-full bg-gray-200 rounded">
                    <div
                      className={`h-full rounded transition-all duration-300 ${isPasswordValid ? "bg-green-500" : "bg-orange-400"
                        }`}
                      style={{ width: `${validCount / totalCriteria * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {validCount}/{totalCriteria} critères remplis
                  </p>
                </div>
              </>
            )}

          </div>

          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input

              type="password"
              name="confirmerPassword"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={vider}
              className="px-4 py-1 border border-gray-900 rounded-lg hover:bg-gray-100 transition font-semibold text-sm"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-2 bg-[#F97316] text-black rounded-lg font-semibold hover:bg-orange-600 transition text-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  En cours...
                </>
              ) : (
                "S’inscrire"
              )}
            </button>

          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Déjà inscrit ?{" "}
          <button
            onClick={() => navigate("/connexion")}
            className="text-[#F97316] font-semibold hover:underline"
          >
            Connexion
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
