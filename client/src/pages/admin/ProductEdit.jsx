import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import {
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import axios from "axios";
export default function ProductEdit() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  // const [product, setProduct] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  const uploadFileHandler = async (e) => {
    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log(res);
      toast.success(res?.message);
      setImage(res?.image);
      // setImage(e.target.files[0]); // Set the File object here
    } catch (e) {
      console.log(e?.data?.message || e?.error);
    }
    // Handle the selected file as needed
  };
  const values = {
    id,
    name,
    price,
    brand,
    image,
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

  const {
    data,
    isLoading,
    refetch,
    // error,
  } = useGetProductDetailsQuery(id);

  const product = data?.data?.product;
  const navigate = useNavigate();
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
    };
    console.log(transformedValues);
    try {
      if (
        !transformedValues.name ||
        !transformedValues.brand ||
        !transformedValues.category ||
        !transformedValues.description
      ) {
        toast.error("You must enter data first");
        return;
      }
      const res = await axios.put(
        `http://localhost:3001/products/${id}`,
        transformedValues,
        {
          headers: headers,
        }
      );
      console.log(res);
      toast.success("Product updated");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data?.data);
      toast.error(err?.response?.data?.data || err.error);
    }
  };
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || 0);
      setBrand(product.brand || "");
      setCategory(product.category || "");
      setCountInStock(product.countInStock || 0);
      setDescription(product.description || "");
      setImage(product.image || "");
    }
  }, [product]);
  return (
    <>
      <Link
        to="/admin/productlist"
        relative="path"
        className="dark:text-white mx-auto flex max-w-2xl items-center space-x-2 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        &larr;{" "}
        <span className="ml-2 dark:text-white">Back to Product List</span>
      </Link>
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
              Image
            </Typography>
            <div className="mb-3 w-96 flex">
              <label
                htmlFor="image"
                className="mb-2 m-auto inline-block items-center justify-center text-neutral-700 dark:text-neutral-200"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></label>
              <input
                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                id="image"
                type="file"
                onChange={uploadFileHandler} // Handle image change
              />
            </div>

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
          {loadingUpload && <CustomSpinner />}

          <Button
            className="mt-6 bg-[#151725] hover:bg-[#151729]"
            fullWidth
            disabled={isLoading}
            type="submit"
            onSubmit={submitHandler}
          >
            {isLoading ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </Card>
    </>
  );
}
