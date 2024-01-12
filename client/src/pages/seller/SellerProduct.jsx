import { Link, useNavigate } from "react-router-dom";
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
            <Card className="h-full w-full xs:overflow-scroll sm:overflow-scroll md:overflow-auto">
              <table className="w-full min-w-max table-auto text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
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
                  {product?.map((p) => (
                    <tr
                      key={p._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        <Link
                          className="text-blue-600"
                          to={`/products/${p._id}`}
                        >
                          {p._id}
                        </Link>
                      </td>
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
