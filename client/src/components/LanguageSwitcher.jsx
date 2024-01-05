// LanguageSwitcher.jsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CustomSpinner from "./CustomSpinner"; // Import your loading spinner component

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const changeLanguage = async (lang) => {
    setLoading(true);

    await i18n.changeLanguage(lang);

    setLoading(false);
  };
  useEffect(() => {
    const dir = i18n.dir(i18n.language);
    document.documentElement.dir = dir;
  }, [i18n, i18n.language]);

  return (
    <div
      className={`relative ${loading ? "opacity-50 pointer-events-none" : ""}`}
    >
      {loading && <CustomSpinner />}

      <div className={i18n.dir() === "rtl" ? "rtl" : ""}>
        <button onClick={() => changeLanguage("en")}>English</button>
        <button onClick={() => changeLanguage("ar")}>العربية</button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
