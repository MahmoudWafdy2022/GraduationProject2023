import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
export default function StoreFront() {
  const { t } = useTranslation();
  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#151725] border-b dark:border-0">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div
            className={i18n.dir() === "rtl" ? "rtl sm:max-w-lg" : "sm:max-w-lg"}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-200">
              {t("homepage.hero")}
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              {
                "This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you live or die."
              }
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div
                  className={
                    i18n.dir() === "rtl"
                      ? "rtl absolute transform sm:right-1/2 sm:top-0 sm:translate-x-8 lg:right-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8"
                      : "absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8"
                  }
                >
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="/assets/header-1.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="/assets/header-3.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg"></div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="/assets/header-2.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg"></div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="/assets/header-2.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="/assets/header-2.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/products/page/1"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                {t("homepage.shop_now")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
