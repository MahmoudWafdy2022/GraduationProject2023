import { useLoaderData, Await, useParams, useNavigate } from "react-router-dom";
import React, { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import EcommerceCard from "../../components/EcommerceCard";
import ProductsNavbar from "../../components/ProductsNavbar";
import CustomSpinner from "../../components/CustomSpinner";
import DefaultPagination from "../../components/DefaultPagination";

export default function Products() {
  // const [pageNumber] = useState(1);

  const params = useParams();
  const { pageNumber, keyword } = params;
  const dataPromise = useLoaderData(pageNumber, keyword);
  console.log(dataPromise.pageInfo);
  const navigate = useNavigate();
  const handlePageChange = (newPage) => {
    // Update the URL with the new page number
    const sortQuery = new URLSearchParams(window.location.search).get("sort");
    const queryString = keyword
      ? `/products/search/${keyword}/page/${newPage}${
          sortQuery ? `?sort=${sortQuery}` : ""
        }`
      : `/products/page/${newPage}${sortQuery ? `?sort=${sortQuery}` : ""}`;

    navigate(queryString);
  };
  const handleSortOptionClick = (sortValue) => {
    // Update the URL with the new sort option
    const newQueryString = keyword
      ? `/products/search/${keyword}/page/${pageNumber}?sort=${sortValue}`
      : `/products/page/${pageNumber}?sort=${sortValue}`;
    navigate(newQueryString);

    // Optionally, you can also trigger a re-fetch of the data
    // based on your data fetching mechanism (e.g., using useLoaderData).

    // Example:
    // const newDataPromise = useLoaderData(1, keyword);
    // console.log(newDataPromise);
  };

  if (dataPromise.message === "Failed to fetch") {
    throw new Error("Please re-connect to the internet.");
  }
  return (
    <section className="dark:bg-[#1C1E2D]">
      <div className="pt-6">
        <ProductsNavbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 p-5">
        <div className="lg:col-span-1">
          <Filter handleSortOptionClick={handleSortOptionClick} />
        </div>
        <div className="lg:col-span-3 grid grid-cols-3 p-1">
          <React.Suspense fallback={<CustomSpinner />}>
            <Await resolve={dataPromise.products}>
              {(products) => {
                return products?.map((product) => {
                  return (
                    <div className="py-1" key={product._id}>
                      <EcommerceCard
                        key={product._id}
                        product={product}
                        id={product._id}
                      />
                    </div>
                  );
                });
              }}
            </Await>
          </React.Suspense>
        </div>
      </div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        <DefaultPagination
          activePage={parseInt(dataPromise.pageInfo.page)}
          totalPages={dataPromise.pageInfo.pages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}

/*
  This Filter requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

const sortOptions = [
  { name: "Most Popular", value: "-createdAt" },
  { name: "Best Rating", value: "-rating" }, // Replace "rating" with your actual field
  { name: "Newest", value: "-createdAt" },
  { name: "Price: Low to High", value: "price" }, // Replace "price" with your actual field
  { name: "Price: High to Low", value: "-price" }, // Replace "price" with your actual field
];
const subCategories = [
  { name: "Laptops", href: "#" },
  { name: "Airpods", href: "#" },
  { name: "Mobile Phones", href: "#" },
  { name: "Others", href: "#" },
];
const filters = [
  // {
  //   id: "color",
  //   name: "Color",
  //   options: [
  //     { value: "white", label: "White", checked: false },
  //     { value: "beige", label: "Beige", checked: false },
  //     { value: "blue", label: "Blue", checked: true },
  //     { value: "brown", label: "Brown", checked: false },
  //     { value: "green", label: "Green", checked: false },
  //     { value: "purple", label: "Purple", checked: false },
  //   ],
  // },
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "Apple", label: "Apple", checked: false },
      { value: "Cannon", label: "Cannon", checked: false },
      { value: "Sony", label: "Sony", checked: false },
      { value: "Logitech", label: "Logitech", checked: false },
      { value: "Amazon", label: "Amazon", checked: false },
    ],
  },
  // {
  //   id: "size",
  //   name: "Size",
  //   options: [
  //     { value: "2l", label: "2L", checked: false },
  //     { value: "6l", label: "6L", checked: false },
  //     { value: "12l", label: "12L", checked: false },
  //     { value: "18l", label: "18L", checked: false },
  //     { value: "20l", label: "20L", checked: false },
  //     { value: "40l", label: "40L", checked: true },
  //   ],
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Filter({ handleSortOptionClick }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ brand: [] });
  const navigate = useNavigate();

  const handleCheckboxChange = (filterId, value) => {
    const updatedFilters = { ...selectedFilters, [filterId]: value };
    setSelectedFilters(updatedFilters);

    // Update the URL with the selected filters
    const queryString = createQueryString(updatedFilters);
    navigate(`/products/page/1${queryString}`);
  };
  const createQueryString = (filters) => {
    const queryString = Object.entries(filters)
      .map(([filterId, values]) => {
        if (values.length > 0) {
          return `${filterId}=${values.join(",")}`;
        }
        return null;
      })
      .filter(Boolean)
      .join("&");

    return queryString ? `?${queryString}` : "";
  };

  return (
    <div className="bg-white dark:bg-[#151725]">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 "
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900 dark:text-white"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3 ">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 ">
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5 "
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      checked={selectedFilters[
                                        section.id
                                      ].includes(option.value)}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        const updatedValues = isChecked
                                          ? [
                                              ...selectedFilters[section.id],
                                              option.value,
                                            ]
                                          : selectedFilters[section.id].filter(
                                              (value) => value !== option.value
                                            );

                                        handleCheckboxChange(
                                          section.id,
                                          updatedValues
                                        );
                                      }}
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:text-white"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500 dark:text-white"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 ">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 "
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions?.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() =>
                                handleSortOptionClick(option.value)
                              } // Update this line
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900 "
                                  : "text-gray-500 ",
                                active ? "bg-gray-100 " : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7 "
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden "
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">{/* Your content */}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
