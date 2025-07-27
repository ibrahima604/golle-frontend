import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaUserCircle,
  FaTimesCircle,
} from "react-icons/fa";
import logo from "../assets/golle.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const passwordCriteria = {
    minLength: {
      label: t("signup.criteria.minLength"),
      isValid: password.length >= 8,
    },
    hasUpperCase: {
      label: t("signup.criteria.uppercase"),
      isValid: /[A-Z]/.test(password),
    },
    hasLowerCase: {
      label: t("signup.criteria.lowercase"),
      isValid: /[a-z]/.test(password),
    },
    hasDigit: {
      label: t("signup.criteria.digit"),
      isValid: /\d/.test(password),
    },
    hasSpecialChar: {
      label: t("signup.criteria.special"),
      isValid: /[@$!%*?&!#^()_+=-]/.test(password),
    },
  };

  const isPasswordValid = Object.values(passwordCriteria).every(item => item.isValid);
  const totalCriteria = Object.keys(passwordCriteria).length;
  const validCount = Object.values(passwordCriteria).filter(c => c.isValid).length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      Swal.fire({
        icon: "error",
        title: t("signup.passwordInvalid"),
        text: t("signup.passwordInvalidMessage"),
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: t("signup.passwordMismatchTitle"),
        text: t("signup.passwordMismatch"),
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        prenom: firstName,
        nom: lastName,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      Swal.fire({
        icon: "success",
        title: t("signup.accountCreated"),
        text: t("signup.verifyEmail"),
        confirmButtonText: t("signup.verifyNow"),
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/email-verification");
        }
      });
    } catch (error) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        Swal.fire({
          icon: "error",
          title: t("signup.validationError"),
          html: Object.values(errors).join("<br>"),
        });
      } else {
        Swal.fire({
          icon: "error",
          title: t("signup.error"),
          text: t("signup.unexpectedError"),
        });
        console.log("Erreur attrapée :", error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-12">
      <div className="w-[400px] max-w-md bg-white shadow-L rounded-xl p-6">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo Golle" className="w-20 h-20 rounded-full" />
        </div>

        <h2 className="text-2xl font-bold text-center text-[#0F172A] mb-6">
          {t("signup.title")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="prenom"
              placeholder={t("signup.firstName")}
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
              placeholder={t("signup.lastName")}
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
              placeholder={t("signup.email")}
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
                placeholder={t("signup.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-400"
              />
            </div>

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

                <div className="mt-2">
                  <div className="h-2 w-full bg-gray-200 rounded">
                    <div
                      className={`h-full rounded transition-all duration-300 ${
                        isPasswordValid ? "bg-green-500" : "bg-orange-400"
                      }`}
                      style={{ width: `${(validCount / totalCriteria) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {validCount}/{totalCriteria} {t("signup.criteriaFilled")}
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
              placeholder={t("signup.confirmPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-1 border border-gray-900 rounded-lg hover:bg-gray-100 transition font-semibold text-sm"
            >
              {t("signup.cancel")}
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
                  {t("signup.loading")}
                </>
              ) : (
                t("signup.submit")
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {t("signup.alreadyAccount")}{" "}
          <button
            onClick={() => navigate("/golle-frontend/connexion")}
            className="text-[#F97316] font-semibold hover:underline"
          >
            {t("signup.login")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
