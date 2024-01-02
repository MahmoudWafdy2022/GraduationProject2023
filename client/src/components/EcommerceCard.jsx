import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { RatingWithText } from "./RatingWithText";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
export default function EcommerceCard({
  product,
  id,
  disableCart = true,
  status = "",
  newArrival = false,
}) {
  const { image, name, price, description, rating, numReviews, countInStock } =
    product;
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo?.role === "ADMIN" || userInfo?.role === "SELLER")
    disableCart = false;
  const dispatch = useDispatch();
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
  const showReviewsText = true;
  function addToCardHandler() {
    if (!countInStock) return;
    dispatch(addToCart({ product }));
    addedSuccessfully();
  }
  return (
    <>
      <Card className="relative w-72 bg-white m-auto shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl dark:bg-[#151725]">
        <Link to={`/products/${id}`}>
          <CardHeader
            shadow={false}
            floated={false}
            className="h-100 dark:bg-[#242635]"
          >
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </CardHeader>
          {status === "pending" && (
            <span className="absolute top-0 left-0 w-20 translate-y-4 -translate-x-6 -rotate-45 bg-yellow-500 text-center text-sm text-white z-1000">
              Pending
            </span>
          )}
          {status === "accepted" && (
            <span className="absolute top-0 left-0 w-20 translate-y-4 -translate-x-6 -rotate-45 bg-green-500 text-center text-sm text-white z-1000">
              Accepted
            </span>
          )}

          {newArrival && (
            // text-1xl font-bold
            <span className="absolute top-0 left-6 w-[55px] h-[55px] flex items-center justify-center rounded-full translate-y-2 -translate-x-6 -rotate-12 bg-black text-center text-1xl font-bold text-white z-1000">
              NEW
            </span>
          )}
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography
                color="blue-gray"
                className="font-medium dark:text-white"
              >
                {name}
              </Typography>
              <Typography
                color="blue-gray"
                className="font-medium ml-6 dark:text-white"
              >
                ${price}
              </Typography>
            </div>
            <div
              style={{ maxHeight: "5rem", overflow: "hidden" }}
              className="mb-2"
            >
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75 dark:text-white"
              >
                {description}
              </Typography>
            </div>
            <RatingWithText
              rating={rating}
              reviews={numReviews}
              showText={showReviewsText}
            />
          </CardBody>
        </Link>
        {disableCart && (
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              onClick={addToCardHandler}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700"
              disabled={!countInStock}
            >
              Add to Cart
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
