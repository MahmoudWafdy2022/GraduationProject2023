import axios from "axios";
import { format } from "date-fns";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import CustomSpinner from "../../components/CustomSpinner";
import ErrorComponent from "../../components/ErrorComponent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card } from "@material-tailwind/react";
export default function OrderList() {
  const { data, isLoading, error } = useGetOrdersQuery();
  const user = useSelector((store) => store.auth.userInfo);
  const token = user.token;
  const navigate = useNavigate();
  const orders = data?.data?.Orders;
  function handleClick(id) {
    const headers = {
      Authorization: `Bearer ${token}`,
      authorization: `Bearer ${token}`,
    };
    async function order() {
      console.log(headers);
      const res = await axios.get(`http://localhost:3001/orders/${id}`, {
        headers: headers,
      });
      const order = res.data.data;
      if (res.data.status == "success") {
        navigate(`/admin/order/view/${id}`, { state: { order } });
      }
    }
    order();
    // navigate(`/order/${id}`);
  }
  return (
    <div className="max-w-2xl  min-w-fit min-h-screen  mx-10">
      {isLoading ? (
        <CustomSpinner />
      ) : error ? (
        <ErrorComponent />
      ) : (
        <>
          <div className="relative  shadow-md sm:rounded-lg flex justify-start items-end flex-col">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center m-2 text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5 mx-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" />
              </svg>

              <span className="mx-1">Refresh</span>
            </button>

            <Card className="h-full w-full xs:overflow-scroll sm:overflow-scroll md:overflow-auto">
              <table className="w-full min-w-max table-auto text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Fullname
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Paid
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delivered
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Paid At
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#151725]">
                  {orders?.map((info) => (
                    <tr
                      key={info._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">{info._id}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {info.user.firstname} {info.user.lastname}
                      </th>
                      <td className="px-6 py-4">{info.user.email}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold ${
                            info.isPaid ? "text-green-900" : "text-red-900"
                          } leading-tight`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${
                              info.isPaid ? "bg-green-200" : "bg-red-200"
                            } opacity-50 rounded-full`}
                          ></span>
                          <span className="relative text-xs">
                            {info.isPaid ? "paid" : "not paid"}
                          </span>
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold ${
                            info.isDelivered ? "text-green-900" : "text-red-900"
                          } leading-tight`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${
                              info.isDelivered ? "bg-green-200" : "bg-red-200"
                            } opacity-50 rounded-full`}
                          ></span>
                          <span className="relative text-xs">
                            {info.isDelivered ? "delivered" : "not delivered"}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {info.createdAt &&
                          format(new Date(info.createdAt), "yyyy-MM-dd")}
                      </td>
                      <td className="px-6 py-4">
                        {info.paidAt &&
                          format(new Date(info.paidAt), "yyyy-MM-dd")}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleClick(info._id)}
                          className="px-5 flex flex-col items-center justify-center py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
              <div>
                <p className="text-sm leading-5 text-blue-700">
                  Showing
                  <span className="font-medium">1</span>
                  to
                  <span className="font-medium">200</span>
                  of
                  <span className="font-medium">2000</span>
                  results
                </p>
              </div>
              <div></div>
            </div> */}
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
