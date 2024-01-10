import { useSelector } from "react-redux";

import { useState } from "react";

import CartSummary from "../components/cart/CartSummary";
import CartCheckout from "../components/cart/CartCheckout";
import useRedirect from "../utils/useRedirect";
import { useTranslation } from "react-i18next";
export default function Cart() {
  const cart = useSelector((store) => store.cart.cardItems);
  const subs = useSelector((store) => store.cart);
  const [current, setCurrent] = useState(0);
  const [qt] = useState(cart[current]?.qty || 1);
  const { t } = useTranslation();
  useRedirect();
  if (subs.cardItems.length <= 0) {
    return (
      <div className="grid h-screen px-4 bg-white dark:bg-[#1C1E2D] place-content-center ">
        <div className="text-center">
          {/* <h1 className="font-black text-gray-200 text-5xl">!</h1> */}

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {t("cart.empty")}
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
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart.map((c, i) => {
            return (
              <CartSummary
                qt={qt}
                key={c._id}
                c={c}
                ind={i}
                setCurrent={setCurrent}
              />
            );
          })}
        </div>
        {/* Sub total */}
        <CartCheckout subs={subs} />
      </div>
    </div>
  );
}
