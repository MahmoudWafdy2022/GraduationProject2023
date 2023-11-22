import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// const navLinks = [
//   {
//     id: "/",
//     title: "Home",
//   },
//   {
//     id: "/products",
//     title: "Shop",
//   },
//   {
//     id: "/cart",
//     title: "Cart",
//   },
// ];

export default function Header({ isDarkMode, setIsDarkMode }) {
  // const [active, setActive] = useState("Home");
  // const [toggle, setToggle] = useState(false);
  const [isLogged] = useState(localStorage.getItem("userInfo"));
  const cart = useSelector((store) => store.cart.cardItems);
  // const activeStyles = {
  //   fontWeight: "bold",
  //   textDecoration: "underline",
  //   // color: "#161616",
  // };

  return (
    <div className={`flex flex-col justify-center`}>
      <TopHeader
        isLogged={isLogged}
        cart={cart}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </div>
  );
}
function TopHeader({ cart, isDarkMode, setIsDarkMode }) {
  useEffect(() => {
    // Apply or remove 'dark' class to #root based on darkMode state
    document.body.classList.toggle("dark", isDarkMode);
    // Save the dark mode preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  return (
    <header className="bg-white dark:bg-[#242635]">
      <div className="border py-3 px-6 dark:border-none">
        <div className="flex justify-between xs:flex-col">
          <div className="flex items-center xs:flex-col">
            <Link to="/" className="flex  justify-between items-center navbar">
              <img
                src="/assets/logo.svg"
                alt="Shopify Logo"
                className="h-6 sm:h-9"
              />
              <span className="ml-2 font-semibold text-[#252C32] dark:text-white">
                Shopify
              </span>
            </Link>
          </div>

          <div className="ml-6 flex flex-1 gap-x-3 relative block">
            <input
              type="text"
              className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
              placeholder="Search a product"
            />
          </div>

          <div className="ml-2 flex">
            {/* <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              </svg>
              <span className="text-sm font-medium">Orders</span>
            </div>
 */}
            {/* <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              <span className="text-sm font-medium">Favorites</span>
            </div> */}

            <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100 dark:hover:bg-[#242635]">
              <Link to="/cart" className="flex items-center gap-x-1">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white ">
                    {cart.length}
                  </span>
                </div>
                <span className="text-sm font-medium dark:text-white">
                  Cart
                </span>
              </Link>
            </div>
            <Link to="/register">
              <div className="ml-2 flex cursor-pointer items-center gap-x-1 border-r py-2 px-4 hover:">
                {/* className="text-sm font-medium " */}
                <span className="relative text-sm font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left dark:text-white dark:after:bg-white">
                  Create an account
                </span>
              </div>
            </Link>
            <Link to="/login">
              <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100 dark:hover:bg-[#242635]">
                <span className="text-sm font-medium dark:text-white ">
                  Sign in
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-x-8">
            <Link
              to="/products"
              className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#242635]"
            >
              <span className="relative text-sm font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left dark:text-white dark:after:bg-white">
                Shop
              </span>
            </Link>
            <Link
              to="/products"
              className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#242635]"
            >
              <span className="relative text-sm font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left dark:text-white dark:after:bg-white">
                New Releases
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-end">
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
      </div>
    </header>
  );
}
