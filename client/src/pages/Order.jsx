import { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
} from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import CustomSpinner from "../components/CustomSpinner";
import ErrorComponent from "../components/ErrorComponent";
import { toast } from "react-toastify";

import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Summary from "../components/orders/Summary";

export default function PlaceOrder() {
  let cart = useSelector((store) => store.cart.cardItems);
  let subs = useSelector((store) => store.cart);
  let user = useSelector((store) => store.auth.userInfo);

  const dispatch = useDispatch();
  const token = user.token;

  const { id } = useParams();
  const { data, refetch, isLoading, error } = useGetOrderDetailsQuery(
    id,
    token
  );

  const location = useLocation();

  const order = data?.data?.order || location?.state?.order;
  console.log(order);
  if (order) {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      taxPrice,
      shippingPrice,
      itemsPrice,
    } = order;
    subs = {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      taxPrice,
      shippingPrice,
      itemsPrice,
    };
    user = order?.user;
    cart = orderItems;
  }

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
        dispatch(clearCartItems());
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

          // loadingDeliver={loadingDeliver}

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
