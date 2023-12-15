import { useNavigate } from "react-router-dom";
// import axios from "axios";
import {
  useGetSellerAcceptedProductsQuery,
  useGetSellerPendingProductsQuery,
} from "../../slices/productsApiSlice";
import CustomSpinner from "../../components/CustomSpinner";
import ErrorComponent from "../../components/ErrorComponent";
// import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Card } from "@material-tailwind/react";

export default function SellerProduct() {
  const user = useSelector((store) => store.auth.userInfo);
  const id = user.id;
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    error,
    // refetch,
  } = useGetSellerAcceptedProductsQuery(id);
  const { data, isLoading2, error2 } = useGetSellerPendingProductsQuery(id);

  //   const product1 = data?.data?.products;
  const pendingProduct = data?.data
    ? data?.data?.products.map((item) => ({
        ...item,
        status: "pending",
      }))
    : [];
  const acceptedProduct = products?.data
    ? products?.data?.products.map((item) => ({
        ...item,
        status: "accepted",
      }))
    : [];

  const product = [...pendingProduct, ...acceptedProduct];
  console.log(product);

  const createProductHandler = async () => {
    navigate("/seller/productpost");
  };
  //   const deleteProductHandler = async (id) => {
  //     if (window.confirm("Are you sure you want to delete this product?")) {
  //       try {
  //         // Use the product ID to construct the URL
  //         const url = `http://localhost:3001/products/${id}`;

  //         // Send the DELETE request
  //         const res = await axios.delete(url, { headers });

  //         console.log(res);

  //         // Refetch the products after deletion
  //         refetch();
  //       } catch (err) {
  //         toast.error(err?.data?.message || err.error);
  //       }
  //     }
  //   };
  return (
    <div className="max-w-2xl mx-auto min-w-fit min-h-screen my-3">
      {isLoading || isLoading2 ? (
        <CustomSpinner />
      ) : error || error2 ? (
        <ErrorComponent />
      ) : (
        <>
          <div className="relative  shadow-md sm:rounded-lg flex justify-start items-end flex-col">
            <button
              type="button"
              onClick={createProductHandler}
              className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Product
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>

            {/* <div className="p-4">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div> */}
            <Card className="h-full w-full xs:overflow-scroll sm:overflow-scroll md:overflow-auto">
              <table className="w-full min-w-max table-auto text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {/* <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th> */}
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Brand
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* <td className="w-4 p-4">
                  <div className="flex items-center">
                  <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                  htmlFor="checkbox-table-search-1"
                  className="sr-only"
                    >
                      checkbox
                    </label>
                    </div>
                </td> */}
                  {product.map((p) => (
                    <tr
                      key={p._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">{p._id}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {p.name}
                      </th>
                      <td className="px-6 py-4">{p.brand}</td>
                      <td className="px-6 py-4">{p.category}</td>
                      <td className="px-6 py-4">${p.price}</td>
                      <td
                        className={`px-6 py-4 text-right ${
                          p?.status === "pending"
                            ? " text-blue-500"
                            : " text-green-500"
                        }`}
                      >
                        {p?.status}
                      </td>
                      {/* <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteProductHandler(p._id)}
                          className="pointer font-medium text-red-600 dark:text-blue-red hover:underline"
                        >
                          Delete
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
