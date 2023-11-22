import React from "react";
import { useLoaderData, Await } from "react-router-dom";
import EcommerceCard from "../../components/EcommerceCard";
import ProductsNavbar from "../../components/ProductsNavbar";
import CustomSpinner from "../../components/CustomSpinner";
export default function Products() {
  const dataPromise = useLoaderData();

  if (dataPromise.message === "Failed to fetch") {
    throw new Error("Please re-connect to the internet.");
  }
  return (
    <section className="dark:bg-[#1C1E2D]">
      <div className="pt-6">
        <ProductsNavbar />
      </div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        <React.Suspense fallback={<CustomSpinner />}>
          <Await resolve={dataPromise.products}>
            {(products) => {
              return products?.map((product) => {
                return (
                  <EcommerceCard
                    key={product._id}
                    product={product}
                    id={product._id}
                  />
                );
              });
            }}
          </Await>
        </React.Suspense>
      </div>
    </section>
  );
}
