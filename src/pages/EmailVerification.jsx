import React, { useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaEnvelopeOpenText } from 'react-icons/fa';

const EmailVerification = () => {
  const [message, setMessage] = useState("");

  const resendVerificationEmail = async () => {
    try {
      await axios.post("http://localhost:8000/api/email/verification-notification", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Lien de vérification renvoyé avec succès !");
    } catch (error) {
      setMessage("Une erreur est survenue lors de l'envoi du lien.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefefe] px-4">
      <div className="bg-white shadow-2xl rounded-xl p-4 max-w-md w-full text-center border-t-8 border-orange-500 animate-fade-in">
        <FaEnvelopeOpenText className="text-5xl text-orange-500 mb-4 mx-auto" />
        <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">Vérifie ton adresse e-mail</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Un lien de confirmation t’a été envoyé par email. Clique dessus pour activer ton compte.
        </p>

        <button
          onClick={resendVerificationEmail}
          className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition duration-200"
        >
          Renvoyer le lien
        </button>

        {message && (
          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-green-600">
            <FaCheckCircle />
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
