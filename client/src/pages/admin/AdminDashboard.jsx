import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { useGetUsersQuery } from "../../slices/userApiSlice";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import { useGetSellerProductsQuery } from "../../slices/productsApiSlice";
import ProductChart from "../../components/admin/ProductChart";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import "chart.js/auto";
import QuickStats from "../../components/admin/QuickStats";
import WeeklySalesChart from "../../components/admin/WeeklySalesChart";

// import { Bar } from "react-chartjs-2";

// const ProductChart = ({ data }) => {
//   // Assuming your product data is an array of objects with labels and values
//   const chartData = {
//     labels: data.map((product) => product.label),
//     datasets: [
//       {
//         label: "Product Count",
//         data: data.map((product) => product.value),
//         backgroundColor: "rgba(75,192,192,0.2)",
//         borderColor: "rgba(75,192,192,1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return <Bar data={chartData} options={chartOptions} />;
// };

export default function AdminDashboard() {
  const { data } = useGetProductsQuery();
  const { data: data2 } = useGetUsersQuery();
  const { data: data3 } = useGetOrdersQuery();
  const { data: data4 } = useGetSellerProductsQuery();
  const totalProductsInStock = data?.data?.totalProductsInStock;
  const weeklySales = data3?.data?.weeklySales;
  const totalSales = data3?.data?.totalSales;
  const dailySales = data3?.data?.dailySales;
  const salesPercentage = data3?.data?.salesPercentage;

  console.log(totalProductsInStock);
  console.log(weeklySales);
  console.log(totalSales);
  console.log(dailySales);
  console.log(salesPercentage);
  return (
    <section className="w-[100wh-60px] lg:w-[100wh-250px]  py-5 pl-5 pr-0 mr-0 right-0 transition-all duration-500 ease-in-out">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-[#151725] ">
        <QuickStats data={data} data2={data2} data3={data3} data4={data4} />
        <div className="bg-white shadow p-4 sm:p-6 xl:p-8 dark:bg-[#151725] mt-4 border-t">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-white ">
              {totalProductsInStock}
            </span>
            <h3 className="text-base font-normal text-gray-500">
              Products in Stock
            </h3>
          </div>
          {data && <ProductChart data={data.data.products} />}
        </div>
        <div className="bg-white shadow p-4 sm:p-6 xl:p-8 dark:bg-[#151725] mt-4 border-t">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-white ">
              ${weeklySales}
            </span>
            <h3 className="text-base font-normal text-gray-500">
              Sales this week
            </h3>
            <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
              {salesPercentage ? (
                <>
                  {salesPercentage}%
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"></path>
                  </svg>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          {weeklySales && <WeeklySalesChart dailySales={dailySales} />}
        </div>
      </div>
      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-20">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-[#151725]">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-white">
                {data?.data?.products.length}
              </span>
              <h3 className="text-base font-normal text-gray-500 dark:text-white">
                Available Products
              </h3>
            </div>
            {/* <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
            14.6%
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"></path>
            </svg>
          </div> */}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-[#151725]">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-white">
                {data2?.data?.users?.length}
              </span>
              <h3 className="text-base font-normal text-gray-500 dark:text-white">
                Total Users
              </h3>
            </div>
            {/* <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
            -2.7%
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"></path>
            </svg>
          </div> */}
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-[#151725]">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-white">
                {data3?.data?.Orders.length}
              </span>
              <h3 className="text-base font-normal text-gray-500 dark:text-white">
                Total Orders
              </h3>
            </div>
            {/* <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
            -2.7%
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"></path>
            </svg>
          </div> */}
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-[#151725]">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-white">
                {data4?.data?.products.length}
              </span>
              <h3 className="text-base font-normal text-gray-500 dark:text-white">
                Pending Products
              </h3>
            </div>
            {/* <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
            -2.7%
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"></path>
            </svg>
          </div> */}
          </div>
          {/* New chart component */}
        </div>
      </div>
    </section>
  );
}
