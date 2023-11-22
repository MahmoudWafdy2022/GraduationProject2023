import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <div className="flex items-center xs:flex-col">
      <Link to="/" className="flex  justify-between items-center navbar">
        <img src="/assets/logo.svg" alt="Shopify Logo" className="h-6 sm:h-9" />
        <span className="ml-2 font-semibold text-[#252C32] dark:text-white">
          Shopify
        </span>
      </Link>
    </div>
  );
}
