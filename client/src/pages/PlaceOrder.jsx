import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import CustomSpinner from "../components/CustomSpinner";
import { toast } from "react-toastify";

export default function PlaceOrder() {
  const cart = useSelector((store) => store.cart.cardItems);
  const subs = useSelector((store) => store.cart);
  const user = useSelector((store) => store.auth.userInfo);

  let token = user.token;
  // { isLoading, error }
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!subs.shippingAddress.address) {
      navigate("/shipping");
    } else if (!subs.paymentMethod) {
      navigate("/payment");
    }
  }, [subs.paymentMethod, subs.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    const { address, postalCode, selectedCity, selectedCountry } =
      subs.shippingAddress;
    const shipAdd = {
      address,
      postalCode,
      city: selectedCity.label,
      country: selectedCountry.label,
    };

    try {
      const res = await createOrder(
        {
          orderItems: subs.cardItems,
          shippingAddress: shipAdd,
          paymentMethod: subs.paymentMethod,
          itemsPrice: subs.itemsPrice,
          shippingPrice: subs.shippingPrice,
          taxPrice: subs.taxPrice,
          totalPrice: subs.totalPrice,
          user: user,
        },
        token
      ).unwrap();
      dispatch(clearCartItems());
      // console.log(res.data.createdOrder._id);

      navigate(`/order/${res.data.createdOrder._id}`);
    } catch (err) {
      console.log(error);
      if (error?.data === "Invalid Token") {
        toast.error("Please Login again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-[#1C1E2D] min-w-full min-h-full">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 p-5">
        Place Order
      </h1>
      <ShippingSteps />
      <Summary
        cart={cart}
        subs={subs}
        user={user}
        placeOrderHandler={placeOrderHandler}
        isLoading={isLoading}
      />
    </div>
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

      <button
        className="flex text-sm text-gray-700 ml-8 focus:outline-none"
        disabled
      >
        <span className="flex items-center justify-center border-2 border-blue-500 rounded-full h-5 w-5 mr-2">
          4
        </span>{" "}
        Place Order
      </button>
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
function Summary({ cart, subs, user, placeOrderHandler, isLoading }) {
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
              <Customer user={user} subs={subs} />
              <Shipping subs={subs} />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
              {isLoading && <CustomSpinner />}
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
function Customer({ user, subs }) {
  return (
    <>
      <h3 className="text-xl dark:text-white  font-semibold  text-gray-800">
        Customer
      </h3>
      <div className="flex justify-center flex-col md:flex-row  flex-col items-stretch  ">
        <div className="flex flex-col justify-start items-start  ">
          <div className=" flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
            <div className="flex flex-col">
              <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                {user.firstname} {user.lastname}
              </p>
              <p className="cursor-pointer text-sm leading-5 ">{user.email}</p>
            </div>
          </div>
          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8 mt-6">
            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
              Shipping Address
            </p>
            <p className="w-50 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 pb-4 border-b border-gray-200">
              {subs.shippingAddress.address} /{" "}
              {subs.shippingAddress.selectedCity.label} /{" "}
              {subs.shippingAddress.selectedCountry.label}
            </p>
          </div>
          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8 mt-6 w-full">
            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
              Payment Method
            </p>
            <p className="w-50 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 pb-4 border-b border-gray-200 w-full">
              {subs.paymentMethod}
            </p>
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
