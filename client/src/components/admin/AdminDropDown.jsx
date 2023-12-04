import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
export default function AdminDropDown({ user, handleLogout }) {
  const btnRef = useRef();
  const [showAdmin, setShowAdmin] = useState(false);
  useEffect(() => {
    const closeDropDown = (e) => {
      if (!btnRef?.current?.contains(e.target)) {
        setShowAdmin(false);
      }
    };
    document.addEventListener("click", closeDropDown);

    return () => document.removeEventListener("click", closeDropDown);
  }, [setShowAdmin]);
  return (
    <div className="flex cursor-pointer items-center justify-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100 dark:hover:bg-[#242635]">
      <div className="relative z-40">
        <button
          ref={btnRef}
          onClick={() => setShowAdmin((prev) => !prev)}
          className="flex items-center justify-center  rounded-full overflow-hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span className="text-sm font-medium dark:text-white ml-1">
            {user?.role}
          </span>
        </button>

        {showAdmin && (
          <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
            <Link
              to="/admin/orderlist"
              onClick={() => setShowAdmin(false)}
              className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
            >
              Order List
            </Link>

            <Link
              to="/admin/productlist"
              onClick={() => setShowAdmin(false)}
              className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
            >
              Product List
            </Link>
            <div className="py-2">
              <hr></hr>
            </div>
            <button
              className="transition-colors text-left w-full duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
