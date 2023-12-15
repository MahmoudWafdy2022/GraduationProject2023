import { useSelector } from "react-redux";

// import { useNavigate } from "react-router-dom";
// import CustomSpinner from "../../components/CustomSpinner";
import EcommerceCard from "../../components/EcommerceCard";
import {
  useGetSellerAcceptedProductsQuery,
  useGetSellerPendingProductsQuery,
} from "../../slices/productsApiSlice";
export default function SellerProfile() {
  const user = useSelector((store) => store.auth.userInfo);
  const id = user.id;
  const {
    data: products,
    // isLoading,
    // error,
    // refetch,
  } = useGetSellerAcceptedProductsQuery(id);
  const { data } = useGetSellerPendingProductsQuery(id);
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

  return (
    <div className="xs:min-w-max bg-gray-100 w-screen h-screen	dark:bg-[#151725]">
      <div className="min-w-fit container mx-auto  p-5 ">
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* <!-- Left Side --> */}
          <div className="w-full md:w-3/12 md:mx-2">
            <ProfileCard user={user} />
            <div className="my-4"></div>
          </div>
          {/* <!-- Right Side --> */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            <SellerProducts product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
function ProfileCard({ user }) {
  return (
    <div className="bg-white p-3  dark:bg-[#1C1E2D] ">
      <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 dark:text-white">
        {user?.firstname} {user?.lastname}
      </h1>
      <h3 className="text-gray-600 font-lg text-semibold leading-6 dark:text-white">
        {user?.email}
      </h3>
    </div>
  );
}
function SellerProducts({ product }) {
  const disableCart = false;
  return (
    <>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {product?.map((p) => {
          return (
            <EcommerceCard
              key={p._id}
              product={p}
              id={p._id}
              disableCart={disableCart}
              status={p.status}
            />
          );
        })}
      </div>
    </>
  );
}
