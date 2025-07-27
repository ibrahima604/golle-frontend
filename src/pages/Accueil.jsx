import React from "react";
import { FiSearch } from "react-icons/fi";
import { FaCode, FaPaintBrush, FaBullhorn, FaPenNib } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Accueil = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-16 font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-[#F97316]/10 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          {t("home.heroTitle")}
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-6">
          {t("home.heroDesc")}
        </p>
        <div className="max-w-xl mx-auto flex rounded-full border border-gray-300 bg-white shadow-md overflow-hidden">
          <input
            type="text"
            placeholder={t("navbar.search_placeholder")}
            className="flex-1 px-4 py-2 text-sm focus:outline-none"
          />
          <button className="bg-[#F97316] px-4 text-white">
            <FiSearch className="text-lg" />
          </button>
        </div>
      </section>

      {/* Catégories Populaires */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">{t("home.popularCategories")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <FaCode className="text-3xl text-[#F97316] mb-2 mx-auto" />
            <p className="font-medium">{t("home.categories.dev")}</p>
          </div>
          <div className="p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <FaPaintBrush className="text-3xl text-[#F97316] mb-2 mx-auto" />
            <p className="font-medium">{t("home.categories.design")}</p>
          </div>
          <div className="p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <FaPenNib className="text-3xl text-[#F97316] mb-2 mx-auto" />
            <p className="font-medium">{t("home.categories.writing")}</p>
          </div>
          <div className="p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <FaBullhorn className="text-3xl text-[#F97316] mb-2 mx-auto" />
            <p className="font-medium">{t("home.categories.marketing")}</p>
          </div>
        </div>
      </section>

      {/* Services en vedette */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          {t("home.featuredServices")}
        </h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={`https://source.unsplash.com/random/600x400?sig=${i}&freelance`}
                alt="service"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{t("home.serviceTitle", { number: i })}</h3>
                <p className="text-sm text-gray-600">{t("home.serviceBy")}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">{t("home.testimonialsTitle")}</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-lg shadow">
              <p className="text-sm text-gray-700 italic mb-4">"{t(`home.testimonial${i}`)}"</p>
              <p className="text-sm font-medium text-gray-900">— {t("home.user")} {i}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Appel à l’action */}
      <section className="py-16 bg-[#F97316] text-white text-center px-6">
        <h2 className="text-3xl font-bold mb-4">{t("home.ctaTitle")}</h2>
        <p className="mb-6">{t("home.ctaSubtitle")}</p>
        <button
          onClick={() => window.location.href = "/golle-frontend/inscription"}
          className="bg-white text-[#F97316] px-6 py-2 rounded-full font-medium hover:bg-orange-100 transition"
        >
          {t("home.ctaButton")}
        </button>
      </section>
    </div>
  );
};

export default Accueil;
