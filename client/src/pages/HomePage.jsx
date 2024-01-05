import { Suspense } from "react";
import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import useRedirect from "../utils/useRedirect";
// import HomePageHeader from "../components/homePage/HomePageHeader";
import HomePageBody from "../components/homePage/HomePageBody";
import CustomSpinner from "../components/CustomSpinner";
import i18n from "../i18n";
import StoreFront from "../components/homePage/StoreFront";
export default function HomePage() {
  useRedirect();
  const { t } = useTranslation();

  return (
    <Suspense fallback={<CustomSpinner />}>
      <header>
        <StoreFront />
        {/* <HomePageHeader /> */}
        <Typography
          variant="h3"
          color="blue-gray"
          className={
            i18n.dir() === "rtl"
              ? "rtl mr-5 mt-7 mb-2 text-3xl md:text-2xl lg:text-3xl dark:text-white"
              : "ml-5 mt-7 mb-2 text-3xl md:text-2xl lg:text-3xl dark:text-white"
          }
        >
          {t("homepage.Latest_Products")}
        </Typography>

        <HomePageBody />
      </header>
    </Suspense>
  );
}
