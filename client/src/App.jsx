import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import React from "react";

import { store } from "./store";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// requireAuth
import requireAuth from "./utils/requireAuth";
// Layouts
import Layout from "./components/Layout";
// Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
//
import Protected from "./components/Protected";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/products/ProductDetails";
// loaders
import productsLoader from "./loaders/productsLoader";
import productDetailsLoader from "./loaders/productDetailsLoader";
// actions
// import registerAction from "./actions/registerAction";
// import loginAction from "./actions/loginAction";

const Products = React.lazy(() => import("./pages/products/Products"));
// loading spinner
import CustomSpinner from "./components/CustomSpinner";

//

// ... (Your other imports)

// Function to check if the user is logged in
// Helper function to get the display name of a component

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<HomePage />} loader={async () => null} />
      <Route
        path="login"
        element={React.createElement(requireAuth(Login))}
        loader={async () => null}
        // action={loginAction}
      />
      <Route
        path="register"
        element={React.createElement(requireAuth(Register))}
        loader={async () => null}
      />
      <Route
        path="products"
        element={
          <React.Suspense fallback={<CustomSpinner />}>
            <Products />
          </React.Suspense>
        }
        loader={productsLoader}
      />
      <Route
        path="products/:id"
        element={<ProductDetails />}
        loader={productDetailsLoader}
      />
      <Route path="cart" element={<Cart />} loader={async () => null} />
      <Route element={<Protected />} loader={async () => null}>
        <Route
          path="shipping"
          element={<Shipping />}
          loader={async () => null}
        />
        <Route path="payment" element={<Payment />} loader={async () => null} />
        <Route
          path="placeorder"
          element={<PlaceOrder />}
          loader={async () => null}
        />
        <Route path="order/:id" element={<Order />} loader={async () => null} />
        <Route path="profile" element={<Profile />} loader={async () => null} />
      </Route>
      <Route path="*" element={<NotFound />} loader={async () => null} />
    </Route>
  )
);
function App() {
  const initialOptions = {
    "client-id":
      "AShmxN6Sc8_VehSatNhIWXAmvWmUrtPgb9EhZ8u6DIY5KMO7uVPdwb2HOGIXU8sGqPhllYrnKTw6J2u5",
    "enable-funding": "paylater",
    "disable-funding": "venmo,card",
    "data-sdk-integration-source": "integrationbuilder_sc",
    currency: "USD",
    intent: "capture",
  };
  return (
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true} options={initialOptions}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  );
}

export default App;
