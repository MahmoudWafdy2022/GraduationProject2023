import { Link, useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Error() {
  const error = useRouteError();
  const { t } = useTranslation();
  return (
    <>
      <div className="grid h-screen px-4 bg-white place-content-center dark:bg-[#1C1E2D]">
        <div className="text-center dark:bg-[#1C1E2D]">
          <h1 className="font-black text-gray-200 text-9xl">{error?.status}</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {t("error_component.oops")}!
          </p>

          <p className="mt-4 text-gray-500">
            {error?.message} {error?.statusText}
            {error?.error}
          </p>

          <Link
            to="/"
            unstable_viewTransition
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            {t("error_component.go_home")}
          </Link>
        </div>
      </div>
    </>
  );
}
