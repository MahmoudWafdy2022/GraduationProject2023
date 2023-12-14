import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import Header from "./headers/Header";
import Sidebar from "./admin/Sidebar";
export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if there's a saved dark mode preference in localStorage
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  if (userInfo?.role === "ADMIN") {
    return (
      <>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <ToastContainer />
        <div className="bg-primary w-full grid grid-cols-[15rem,1fr] dark:bg-[#1C1E2D] overflow-auto">
          <Sidebar />
          <main className="min-h-screen content-start">
            <Outlet />
          </main>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <div className="bg-primary w-full overflow-hidden dark:bg-[#1C1E2D]">
      <ToastContainer />
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main className="min-h-screen ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
