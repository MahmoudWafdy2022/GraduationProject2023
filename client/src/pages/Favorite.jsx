// Favorites.jsx
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import EcommerceCard from "../components/EcommerceCard";
import { Link } from "react-router-dom";
const Favorites = () => {
  const favorites = useSelector((store) => store.favorites.favoriteItems);
  const { t } = useTranslation();
  console.log(favorites);
  if (favorites?.length === 0) {
    return (
      <div className="grid h-screen px-4 bg-white dark:bg-[#1C1E2D] place-content-center ">
        <div className="text-center flex flex-col justify-center items-center dark:text-white">
          {/* <h1 className="font-black text-gray-200 text-5xl">!</h1> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="currentColor"
            className="bi bi-heartbreak"
            viewBox="0 0 16 16"
          >
            <path d="M8.867 14.41c13.308-9.322 4.79-16.563.064-13.824L7 3l1.5 4-2 3L8 15a38 38 0 0 0 .867-.59m-.303-1.01-.971-3.237 1.74-2.608a1 1 0 0 0 .103-.906l-1.3-3.468 1.45-1.813c1.861-.948 4.446.002 5.197 2.11.691 1.94-.055 5.521-6.219 9.922m-1.25 1.137a36 36 0 0 1-1.522-1.116C-5.077 4.97 1.842-1.472 6.454.293c.314.12.618.279.904.477L5.5 3 7 7l-1.5 3zm-2.3-3.06-.442-1.106a1 1 0 0 1 .034-.818l1.305-2.61L4.564 3.35a1 1 0 0 1 .168-.991l1.032-1.24c-1.688-.449-3.7.398-4.456 2.128-.711 1.627-.413 4.55 3.706 8.229Z" />
          </svg>
          <p className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            {t("favorutes.empty")}
          </p>
          <p className="text-lg font-medium tracking-tight text-gray-700 sm:text-xl dark:text-white mt-1">
            {t("cart.details")} {":)"}
          </p>
          <Link
            to="/products/page/1"
            className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 mt-5"
          >
            {t("homepage.shop_now")}
          </Link>
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
