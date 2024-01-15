// Favorites.jsx
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import EcommerceCard from "../components/EcommerceCard";
const Favorites = () => {
  const favorites = useSelector((store) => store.favorites.favoriteItems);
  const { t } = useTranslation();
  console.log(favorites);
  if (favorites?.length === 0) {
    return (
      <div className="grid h-screen px-4 bg-white dark:bg-[#1C1E2D] place-content-center ">
        <div className="text-center">
          {/* <h1 className="font-black text-gray-200 text-5xl">!</h1> */}

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {t("favorutes.empty")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 pt-20 overflow-y-auto dark:bg-[#1C1E2D] scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:scrollbar-thumb-blue-500 dark:scrollbar-track-gray-700">
      <h1 className="mb-10 text-center text-2xl font-bold dark:text-white">
        {t("cart.items")}
      </h1>
      <div className="mx-auto max-w-5xl px-6">
        <div className="lg:col-span-3 grid grid-cols-3 p-1">
          {favorites?.map((item) => (
            <div key={item._id} className="mb-6">
              <EcommerceCard product={item} id={item._id} />
            </div>
          ))}
          {/* {cart.map((c, i) => {
            return (
              <CartSummary
                qt={qt}
                key={c._id}
                c={c}
                ind={i}
                setCurrent={setCurrent}
              />
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
