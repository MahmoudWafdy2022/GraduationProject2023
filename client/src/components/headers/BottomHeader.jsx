import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
export default function BottomHeader({ setIsDarkMode }) {
  const { t } = useTranslation();

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex gap-x-8">
        <Link
          to="/products/page/1"
          className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#242635]"
        >
          <span className="relative text-sm font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left dark:text-white dark:after:bg-white">
            {t("homepage.shop")}
          </span>
        </Link>
        <Link
          to="/products/page/1"
          className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#242635]"
        >
          <span className="relative text-sm font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left dark:text-white dark:after:bg-white">
            {t("homepage.new_releases")}
          </span>
        </Link>
      </div>
      <div className="flex items-center justify-end">
        <LanguageSwitcher />
        <button
          className="flex cursor-pointer justify-center items-center pt-1 h-7 w-7 ml-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 gap-x-2"
          onClick={() => setIsDarkMode((prev) => !prev)}
        >
          <svg
            className="fill-grey-400 block dark:hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg
            className="fill-yellow-500 hidden dark:block"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
