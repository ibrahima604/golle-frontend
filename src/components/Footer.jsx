import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0F172A] text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Golle - Présentation */}
        <div>
          <h3 className="text-xl font-bold mb-4">Golle</h3>
          <p className="text-sm text-gray-300">{t("footer.description")}</p>
        </div>

        {/* Liens rapides */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{t("footer.navigation")}</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-orange-400 cursor-pointer">{t("footer.links.home")}</li>
            <li className="hover:text-orange-400 cursor-pointer">{t("footer.links.explore")}</li>
            <li className="hover:text-orange-400 cursor-pointer">{t("footer.links.becomeSeller")}</li>
            <li className="hover:text-orange-400 cursor-pointer">{t("footer.links.contact")}</li>
          </ul>
        </div>

        {/* Catégories */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{t("footer.categoriesTitle")}</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-orange-400 cursor-pointer">{t("footer.categories.web")}</li>
            <li className="hover:text-orange-400 cursor-pointer">{t("footer.categories.design")}</li>
            <li className="hover:text-orange-400 cursor-pointer">{t("footer.categories.marketing")}</li>
            <li className="hover:text-orange-400 cursor-pointer">{t("footer.categories.writing")}</li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{t("footer.followUs")}</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-orange-400"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-400"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-400"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Golle. {t("footer.rights")}
      </div>
    </footer>
  );
};

export default Footer;
