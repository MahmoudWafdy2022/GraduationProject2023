import { useState } from "react";
import { useSelector } from "react-redux";
import {
  // Form,
  Textarea,
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import CustomSpinner from "../../components/CustomSpinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ProductPost() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  // const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const values = {
    name,
    price,
    brand,
    category,
    description,
    countInStock,
  };
  const user = useSelector((store) => store.auth.userInfo);
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    authorization: `Bearer ${token}`,
  };

  //   const navigate = useNavigate();
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const transformedValues = {
      ...values,
      name: capitalizeWords(name),
      category: capitalizeFirstLetter(category),
      brand: capitalizeFirstLetter(brand),
      description: capitalizeFirstLetter(description),
      user: user?.id,
    };
    console.log(transformedValues);
    try {
      if (
        !transformedValues.name ||
        !transformedValues.brand ||
        !transformedValues.category ||
        !transformedValues.description ||
        !transformedValues.user
      ) {
        toast.error("You must enter data first");
        return;
      }
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3001/products/seller",
        transformedValues,
        {
          headers: headers,
        }
      );
      console.log(res);
      setIsLoading(false);
      toast.success("Product is under review");
      navigate("/seller/productlist");
    } catch (err) {
      setIsLoading(false);
      console.log(err?.response?.data?.data);
      toast.error(err?.response?.data?.data || err.error);
    }
  };

  return (
    <>
      {/* <Link
        to="/admin/productlist"
        relative="path"
        className="dark:text-white mx-auto flex max-w-2xl items-center space-x-2 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        &larr;{" "}
        <span className="ml-2 dark:text-white">Back to Product List</span>
      </Link> */}
      <Card
        color="transparent"
        shadow={false}
        className="h-screen min-w-max  m-auto flex flex-col  justify-center items-center"
      >
        <form onSubmit={submitHandler} className="mt-8 mb-2 min-w-max  sm:w-96">
          <div className="mb-1 flex flex-col gap-6 grid grid-cols-2 grid-rows-5 gap-4">
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              Product Name
            </Typography>
            <Input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              size="lg"
              placeholder="Airpods"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              Product Price
            </Typography>
            <Input
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min={0}
              id="price"
              size="lg"
              placeholder="20$"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              Product Brand
            </Typography>
            <Input
              name="brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              id="brand"
              size="lg"
              placeholder="brand"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              Product Category
            </Typography>
            <Input
              name="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              size="lg"
              placeholder="category"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              Product Count in Stock
            </Typography>
            <Input
              name="countInStock"
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              id="countInStock"
              size="lg"
              min={0}
              placeholder="13"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              Product Description
            </Typography>
            <Textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              size="lg"
              placeholder="Product description"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {isLoading && <CustomSpinner />}
          <Button
            className="mt-6 bg-[#151725] hover:bg-[#151729]"
            fullWidth
            disabled={isLoading}
            type="submit"
            onSubmit={submitHandler}
          >
            {isLoading ? "Creating..." : "Create a new Product"}
          </Button>
        </form>
      </Card>
    </>
  );
}
