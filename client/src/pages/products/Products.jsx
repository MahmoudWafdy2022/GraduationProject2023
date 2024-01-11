import { useLoaderData, Await, useParams, useNavigate } from "react-router-dom";
import React from "react";
import EcommerceCard from "../../components/EcommerceCard";
import ProductsNavbar from "../../components/ProductsNavbar";
import CustomSpinner from "../../components/CustomSpinner";
import DefaultPagination from "../../components/DefaultPagination";
import Filter from "../../components/Filter";
export default function Products() {
  // const [pageNumber] = useState(1);

  const params = useParams();
  console.log(params);
  const { pageNumber, keyword } = params;
  const dataPromise = useLoaderData(pageNumber, keyword);
  console.log(dataPromise);
  const navigate = useNavigate();
  const handlePageChange = (newPage) => {
    // Update the URL with the new page number
    const sortQuery = new URLSearchParams(window.location.search).get("sort");
    const brandQuery = new URLSearchParams(window.location.search).get("brand");
    const queryString = keyword
      ? `/products/search/${keyword}/page/${newPage}${
          sortQuery ? `?sort=${sortQuery}` : ""
        }${brandQuery ? `brand=${brandQuery}` : ""}`
      : `/products/page/${newPage}${sortQuery ? `?sort=${sortQuery}` : ""}${
          brandQuery ? `brand=${brandQuery}` : ""
        }`;

    navigate(queryString);
  };
  const handleSortOptionClick = (sortValue) => {
    const newQueryString = keyword
      ? `/products/search/${keyword}/page/${pageNumber}?sort=${sortValue}`
      : `/products/page/${pageNumber}?sort=${sortValue}`;
    navigate(newQueryString);
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
          <Filter
            handleSortOptionClick={handleSortOptionClick}
            pageNumber={pageNumber}
          />
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
