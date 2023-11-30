import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
} from "../slices/orderApiSlice";
import CustomSpinner from "../components/CustomSpinner";
import ErrorComponent from "../components/ErrorComponent";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export default function PlaceOrder() {
  const cart = useSelector((store) => store.cart.cardItems);
  const subs = useSelector((store) => store.cart);
  const user = useSelector((store) => store.auth.userInfo);
  const { id } = useParams();

  //   let token = user.token;
  // { isLoading, error }

  const { data, refetch, isLoading, error } = useGetOrderDetailsQuery(id);
  //   console.log(data.data.order);
  const order = data?.data?.order;

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  // createOrder={createOrder} onApprove={onApprove} onError={onError}
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        console.log(details);
        await payOrder({ id, details });
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
      }
    });
  }
  // async function onApproveTest() {
  //   await payOrder({ id, details: { payer: {} } });

  //   refetch();
  //   toast.success("Order is paid");
  // }
  function onError(err) {
    toast.error(err.message);
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            currency_code: "USD",
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        console.log("order id is:" + orderID);
        return orderID;
      });
  }
  return isLoading ? (
    <CustomSpinner />
  ) : error ? (
    <ErrorComponent />
  ) : (
    <>
      <div className="bg-gray-100 dark:bg-[#1C1E2D] min-w-full min-h-full">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 p-5">
          Order: {id}
        </h1>
        <ShippingSteps />
        <Summary
          // onApproveTest={onApproveTest}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          cart={cart}
          subs={subs}
          user={user}
          order={order}
          loadingPay={loadingPay}
          isPending={isPending}
        />
      </div>
    </>
  );
}

function ShippingSteps() {
  return (
    <div className="flex items-center justify-center mb-3">
      <Link
        to="/cart"
        className="flex text-sm text-blue-500 focus:outline-none"
      >
        <span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">
          1
        </span>{" "}
        Cart
      </Link>
      <Link
        to="/shipping"
        className="flex text-sm text-blue-500 ml-8 focus:outline-none"
      >
        <span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">
          2
        </span>{" "}
        Shipping
      </Link>
      <Link
        to="/payment"
        className="flex text-sm text-blue-500 ml-8 focus:outline-none"
      >
        <span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">
          3
        </span>{" "}
        Payments
      </Link>

      <Link
        to="/placeorder"
        className="flex text-sm text-blue-500 ml-8 focus:outline-none"
      >
        <span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">
          4
        </span>{" "}
        Place Order
      </Link>
    </div>
  );
}

// function PaymentInfo() {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
//         Payment Information
//       </h2>
//       <div className="mt-4">
//         <label
//           htmlFor="card_number"
//           className="block text-gray-700 dark:text-white mb-1"
//         >
//           Card Number
//         </label>
//         <input
//           type="text"
//           id="card_number"
//           className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4 mt-4">
//         <div>
//           <label
//             htmlFor="exp_date"
//             className="block text-gray-700 dark:text-white mb-1"
//           >
//             Expiration Date
//           </label>
//           <input
//             type="text"
//             id="exp_date"
//             className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="cvv"
//             className="block text-gray-700 dark:text-white mb-1"
//           >
//             CVV
//           </label>
//           <input
//             type="text"
//             id="cvv"
//             className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

function Summary({
  cart,
  subs,
  user,
  order,
  loadingPay,
  isPending,
  createOrder,
  onApprove,
  onError,
  // onApproveTest,
}) {
  return (
    <div className="bg-gray-100 min-w-full dark:bg-[#1C1E2D] ">
      <div className=" min-w-full justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="h-screen w-full ">
          <div className="grid grid-cols-2 md:grid-cols-2  w-full h-min ">
            <div className="flex flex-col justify-start items-start min-w-max space-y-4 md:space-y-6 xl:space-y-8 auto-cols-max">
              <div className="bg-white dark:bg-[#1C1E2D] py-8 px-20 rounded-lg shadow-md border dark:border-[#242635] flex flex-col m-auto z-0 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:scrollbar-thumb-blue-500 dark:scrollbar-track-gray-700">
                <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                  Customer’s Cart
                </p>

                <Cart cart={cart} />
              </div>
              {/*  */}
            </div>
            <div className="bg-gray-50 dark:bg-[#151725] flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col min-w-fit ml-auto">
              <Customer user={user} subs={subs} order={order} />
              <Shipping subs={subs} />

              {!order.isPaid && (
                <>
                  {loadingPay && <CustomSpinner />}
                  {isPending ? (
                    <CustomSpinner />
                  ) : (
                    <div>
                      {/* <button
                        onClick={onApproveTest}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700"
                      >
                        test pay order
                      </button> */}
                      <div>
                        <PayPalButtons
                          style={{
                            shape: "rect",
                            layout: "vertical",
                          }}
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* Sub total */}
      </div>
    </div>
  );
}
function Cart({ cart }) {
  const mappedElements = cart.map((c) => (
    <div key={c._id}>
      <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full py-4 border-b border-gray-200">
        <div className="w-full md:w-40">
          <img className="w-full hidden md:block" src={c.image} alt={c.name} />
        </div>
        <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-full flex flex-col justify-start items-start space-y-8">
            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
              {c.name}
            </h3>
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-sm dark:text-white leading-none text-gray-800">
                <span className="dark:text-gray-400 text-gray-300">
                  Brand:{" "}
                </span>{" "}
                {c.brand}
              </p>
              <p className="text-sm dark:text-white leading-none text-gray-800">
                <span className="dark:text-gray-400 text-gray-300">
                  Category:{" "}
                </span>{" "}
                {c.category}
              </p>
            </div>
          </div>
          <div className="flex justify-between space-x-8 items-start w-full">
            <p className="text-base dark:text-white xl:text-lg leading-6">
              ${c.price}{" "}
            </p>
            <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
              {c.qty}
            </p>
            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
              ${(c.price * c.qty).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  ));
  return mappedElements;
}
function Customer({ user, subs, order }) {
  return (
    <>
      <h3 className="text-xl dark:text-white  font-semibold  text-gray-800">
        Customer
      </h3>
      <div className="flex justify-center flex-col md:flex-row  flex-col items-stretch  ">
        <div className="flex flex-col justify-start items-start  ">
          <div className=" flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-2 border-b border-gray-200 w-full">
            <div className="flex flex-col">
              <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                {user.firstname} {user.lastname}
              </p>
              <p className="cursor-pointer text-sm leading-5 ">{user.email}</p>
            </div>
          </div>
          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-3 xl:mt-8 mt-3">
            <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
              Shipping Address
            </p>
            <p className="w-50 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 ">
              {subs.shippingAddress.address} /{" "}
              {subs.shippingAddress.selectedCity.label} /{" "}
              {subs.shippingAddress.selectedCountry.label}
            </p>
            {order.isDelivered ? (
              <div className="font-regular relative block w-full rounded-lg bg-green-500 p-2 text-base leading-5 text-white opacity-100 border-b border-gray-200">
                Delivered
              </div>
            ) : (
              <div className="font-regular relative block w-full rounded-lg bg-red-500 p-2 text-base leading-5 text-white opacity-100 border-b border-gray-200">
                Not Delivered
              </div>
            )}
          </div>
          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8 mt-4 w-full">
            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
              Payment Method
            </p>

            <p className="w-50 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600  w-full">
              {subs.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className="font-regular relative block w-full rounded-lg bg-green-500 p-2 text-base leading-5 text-white opacity-100 border-b border-gray-200">
                Paid on {order.paidAt}
              </div>
            ) : (
              <div className="font-regular relative  block w-full rounded-lg bg-red-500 p-2 text-base leading-5 text-white opacity-100 border-b border-gray-200">
                Not Paid
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
function Shipping({ subs }) {
  return (
    <>
      <div className="flex justify-center flex-col md:flex-row flex-col items-stretch h-full  space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        {/*  */}
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-[#151725] space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            Summary
          </h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4 ">
            <div className="flex justify-between w-full ">
              <p className="text-base dark:text-white leading-4 text-gray-800">
                Subtotal
              </p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                ${subs.itemsPrice}
              </p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">
                Tax Price{" "}
                <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                  +VAT
                </span>
              </p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                ${subs.taxPrice}
              </p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">
                Shipping
              </p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                ${subs.shippingPrice}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
              Total
            </p>
            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
              ${subs.totalPrice}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
