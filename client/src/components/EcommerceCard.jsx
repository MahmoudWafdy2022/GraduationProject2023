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
        {status === "pending" && (
          <div className="absolute top-[-5%] left-[-7%] bg-yellow-500 text-white px-2 py-1 rounded-tl-md rounded-br-md transform rotate-[-35deg] scale-110">
            Pending
          </div>
        )}
        {status === "accepted" && (
          <div className="absolute top-[-5%] left-[-9%] bg-green-500 text-white px-2 py-1 rounded-tl-md rounded-br-md transform rotate-[-35deg] scale-110">
            Accepted
          </div>
        )}
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
