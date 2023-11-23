import { Link, useLocation, useLoaderData } from "react-router-dom";
import { RatingWithText } from "../../components/RatingWithText";
import ProductsNavbar from "../../components/ProductsNavbar";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../../slices/cartSlice";
import { toast } from "react-toastify";
export default function VanDetail() {
  const location = useLocation();
  const product = useLoaderData();

  const hideReviewsText = false;
  const search = location.state?.search || "";

  const addedSuccessfully = () =>
    toast.success("Added Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  // const type = location.state?.type || "all";
  const min = 1;
  const max = product.countInStock;
  function handleChange(e) {
    const value = Math.max(min, Math.min(max, Number(e.target.value)));
    setQty(value);
  }
  function addToCardHandler() {
    dispatch(addToCart({ product, qty }));
    addedSuccessfully();
  }
  return (
    <div>
      <Link
        to={`..${search}`}
        relative="path"
        className="dark:text-white mx-auto flex max-w-2xl items-center space-x-2 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        &larr;{" "}
        <span className="ml-2 dark:text-white">Back to all products</span>
      </Link>
      <div className="bg-white dark:bg-[#1C1E2D]">
        <div className="pt-6">
          <ProductsNavbar product={product} />
          {/* <!-- Image gallery --> */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl  lg:gap-x-8 lg:px-8">
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-50 w-50 object-cover object-center"
                />
              </div>
            </div>

            {/* <!-- Product info --> */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                  {product.name}
                </h1>
              </div>

              {/* <!-- Options --> */}
              <div className="mt-4 lg:row-span-3 lg:mt-0 ">
                <h2 className="sr-only dark:text-white">
                  {product.description}
                </h2>

                <div className="mb-2 flex flex-col justify-between">
                  <p className="text-3xl tracking-tight text-gray-900 mb-4 dark:text-white">
                    ${product.price}
                  </p>
                  {product.countInStock > 0 ? (
                    <p className="text-1xl tracking-tight text-[#007600] mb-4 ">
                      In Stock
                    </p>
                  ) : (
                    <p className="text-1xl tracking-tight text-[#CC0C39] mb-4">
                      Out of Stock
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 dark:text-white">Qty</p>
                  <form>
                    <input
                      className="appearance-none   w-20 bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="number"
                      placeholder={qty}
                      value={qty}
                      onChange={handleChange}
                      min={1}
                      max={product.countInStock}
                    />
                  </form>
                </div>
                <hr className="my-4" />

                {/* <!-- Reviews --> */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <RatingWithText
                        rating={product.rating}
                        reviews={product.numReviews}
                        showText={hideReviewsText}
                      />
                    </div>
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    <Link
                      href="."
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {product.numReviews} reviews
                    </Link>
                  </div>
                </div>

                {product.countInStock > 0 && (
                  <button
                    type="button"
                    className="mt-20 flex w-full items-center justify-center rounded-md border border-transparent bg-[#FBC02D] px-8 py-3 text-base font-medium text-white hover:bg-[#FBC03D] focus:outline-none focus:ring-2 focus:bg-[#FBC03D] focus:ring-offset-2"
                    disabled={product.countInStock === 0}
                    onClick={addToCardHandler}
                  >
                    Add to bag
                  </button>
                )}
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* <!-- Description and details --> */}
                <div>
                  <h3 className="sr-only dark:text-white">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900 dark:text-white">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm "
                    >
                      <li className="text-gray-400 ">
                        <span className="text-gray-600 dark:text-white">
                          Hand cut and sewn locally
                        </span>
                      </li>
                      <li className="text-gray-400">
                        <span className="text-gray-600 dark:text-white">
                          Dyed with our proprietary colors
                        </span>
                      </li>
                      <li className="text-gray-400">
                        <span className="text-gray-600 dark:text-white">
                          Pre-washed &amp; pre-shrunk
                        </span>
                      </li>
                      <li className="text-gray-400">
                        <span className="text-gray-600 dark:text-white">
                          Ultra-soft 100% cotton
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900 dark:text-white">
                    Details
                  </h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600 dark:text-white">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div>
//   <img src={product.image} />
//   <p>{product.name}</p>
//   <p>{product.brand}</p>
//   <p>{product.category}</p>
//   <p>{product.price}</p>
//   <p>{product.countInStock}</p>
//   <p>{product.rating}</p>
//   <p>{product.numReviews}</p>
//   <p>{product.description}</p>
// </div>
