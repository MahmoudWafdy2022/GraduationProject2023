import { useTranslation } from "react-i18next";
export default function ErrorComponent({ error }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="grid h-screen px-4 bg-white place-content-center dark:bg-[#1C1E2D]">
        <div className="text-center">
          <h1 className="font-black text-gray-200 text-5xl dark:text-white">
            {error?.status}
          </h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {t("error_component.oops")}!
          </p>

          <p className="mt-4 text-gray-500 ">
            {error?.status === 400
              ? t("error_component.reconnect")
              : error?.data?.message || error.error}
          </p>
        </div>
      </div>
    </>
  );
}
