import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import HomePageHeader from "../components/homePage/HomePageHeader";
import HomePageBody from "../components/homePage/HomePageBody";
import { useSelector } from "react-redux";
export default function HomePage() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.role === "ADMIN") {
      navigate("/admin");
    }
  }, [navigate, userInfo]);
  return (
    <header>
      <HomePageHeader />
      <Typography
        variant="h3"
        color="blue-gray"
        className="ml-5 mt-7 mb-2 text-3xl md:text-2xl lg:text-3xl dark:text-white"
      >
        Latest Products
      </Typography>

      <HomePageBody />
    </header>
  );
}
