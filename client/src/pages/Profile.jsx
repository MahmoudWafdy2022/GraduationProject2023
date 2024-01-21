import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useProfileMutation } from "../slices/userApiSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";

// import { useNavigate } from "react-router-dom";

import About from "../components/profile/About";
import OrderHistory from "../components/profile/OrderHistory";
export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((store) => store.auth.userInfo);
  const cart = useSelector((state) => state.cart);
  let { shippingAddress } = cart;
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const order = orders?.data?.orders;
  // console.log(userInfo?.role !== "USER");
  // const orders = data.data.orders;

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (!isObjEmpty(shippingAddress)) {
    // Use the existing shippingAddress from the cart
    console.log(shippingAddress);
  } else if (
    Array.isArray(order) &&
    order.length > 0 &&
    order[0]?.shippingAddress
  ) {
    // Use the shippingAddress from the first order if available
    shippingAddress = order[0]?.shippingAddress;
    console.log(shippingAddress);
  }

  const dispatch = useDispatch();

  return (
    <div className="xs:min-w-max bg-gray-100 w-screen h-screen	dark:bg-[#151725]">
      <div className="min-w-fit container mx-auto  p-5 ">
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* <!-- Left Side --> */}
          {/* <div className="w-full md:w-3/12 md:mx-2"> */}
          {/* <ProfileCard user={user} /> */}
          {/* <div className="my-4"></div> */}
          {/* </div> */}
          {/* <!-- Right Side --> */}
          <div className="w-full  h-96">
            <About
              user={user}
              shippingAddress={shippingAddress}
              updateProfile={updateProfile}
              dispatch={dispatch}
              userInfo={userInfo}
              loadingUpdateProfile={loadingUpdateProfile}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
            {!isEdit && userInfo?.role === "USER" && (
              <OrderHistory order={order} isLoading={isLoading} error={error} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// function ProfileCard({ user }) {
//   return (
//     <div className="bg-white p-3  dark:bg-[#1C1E2D] ">
//       {/* <div className="image overflow-hidden">
//         <img
//           className="h-auto w-full mx-auto"
//           src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
//           alt=""
//         />
//       </div> */}
//       <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 dark:text-white">
//         {user?.firstname} {user?.lastname}
//       </h1>
//       <h3 className="text-gray-600 font-lg text-semibold leading-6 dark:text-white">
//         {/* Owner at Her Company Inc. */}
//       </h3>
//       <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 dark:text-white">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit,
//         eligendi dolorum sequi illum qui unde aspernatur non deserunt
//       </p>
//       {/* <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
//       <li className="flex items-center py-3">
//                   <span>Status</span>
//                   <span className="ml-auto">
//                     <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
//                       Active
//                     </span>
//                   </span>
//                 </li>
//       <li className="flex items-center py-3">
//                   <span>Member since</span>
//                   <span className="ml-auto">Nov 07, 2016</span>
//                 </li>
//       </ul> */}
//     </div>
//   );
// }
