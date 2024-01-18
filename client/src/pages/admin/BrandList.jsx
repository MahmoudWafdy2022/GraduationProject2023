// BrandList.jsx
import { Link } from "react-router-dom";
import axios from "axios";
// import { useQuery } from "react-query";
import { toast } from "react-toastify";
import CustomSpinner from "../../components/CustomSpinner";
import ErrorComponent from "../../components/ErrorComponent";
import { Card } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useGetBrandsQuery } from "../../slices/productsApiSlice";

export default function BrandList() {
  const { data, isLoading, error, refetch } = useGetBrandsQuery();
  const brands = data?.data?.listOfBrands;
  console.log(data);
  const user = useSelector((store) => store.auth.userInfo);
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    authorization: `Bearer ${token}`,
  };

  const createBrandHandler = async () => {
    if (window.confirm("Are you sure you want to create a new brand?")) {
      try {
        const defaultBrandName = "Sample Brand";
        const response = await axios.post(
          "http://localhost:3001/brands",
          { name: defaultBrandName },
          { headers }
        );

        refetch();
        console.log(response);
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || err.message);
      }
    }
  };
  const deleteBrandHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        const url = `http://localhost:3001/brands/${id}`;
        await axios.delete(url, { headers });
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="min-w-fit max-h-min my-3 ml-5">
      {isLoading ? (
        <CustomSpinner />
      ) : error ? (
        <ErrorComponent />
      ) : (
        <>
          <div className="relative shadow-md sm:rounded-lg flex justify-start items-end flex-col">
            <button
              type="button"
              onClick={createBrandHandler}
              className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Brand
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

            <Card className="h-full w-full overflow-y-auto max-h-96">
              <table className="w-full min-w-max table-auto text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {brands?.map((brand) => (
                    <tr
                      key={brand._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">{brand._id}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {brand.name}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/admin/brand/${brand._id}/edit`}
                          className="font-medium text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteBrandHandler(brand._id)}
                          className="pointer font-medium text-red-600 dark:text-blue-red hover:underline"
                        >
                          Delete
                        </button>
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
