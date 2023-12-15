import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
export default function UserHamburger({
  user,
  setShowProfile,
  showProfile,
  handleLogout,
}) {
  const btnRef = useRef();

  useEffect(() => {
    const closeDropDown = (e) => {
      if (!btnRef?.current?.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("click", closeDropDown);

    return () => document.removeEventListener("click", closeDropDown);
  }, [setShowProfile]);
  return (
    <>
      {user?.token ? (
        <div className="flex cursor-pointer items-center justify-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100 dark:hover:bg-[#242635]">
          <div className="relative z-40">
            <button
              ref={btnRef}
              onClick={() => setShowProfile((prev) => !prev)}
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
                {user?.firstname} {user?.lastname}
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
                <Link
                  to="/profile"
                  className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
                >
                  Profile
                </Link>
                <div className="py-2">
                  <hr></hr>
                </div>
                <button
                  onClick={handleLogout}
                  className="transition-colors text-left w-full duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {" "}
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
        </>
      )}
    </>
  );
}
