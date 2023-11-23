import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./headers/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./Footer";
export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if there's a saved dark mode preference in localStorage
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
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
