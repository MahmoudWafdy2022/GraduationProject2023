import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  // Form,
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import CustomSpinner from "../../components/CustomSpinner";
import { useGetUserDetailsQuery } from "../../slices/userApiSlice";
import axios from "axios";
export default function UserEdit() {
  const { id } = useParams();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const values = {
    id,
    firstname,
    lastname,
    email,
    role,
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
  } = useGetUserDetailsQuery(id);

  const targetUser = data?.data?.user;
  //   const product = {};
  const navigate = useNavigate();
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const transformedValues = {
      ...values,
      firstname: capitalizeWords(firstname),
      lastname: capitalizeWords(lastname),
      email: email,
      role: role,
    };

    try {
      if (
        !transformedValues.lastname ||
        !transformedValues.firstname ||
        !transformedValues.email ||
        !transformedValues.role
      ) {
        toast.error("You must enter data first");
        return;
      }
      const res = await axios.put(
        `http://localhost:3001/users/${id}`,
        transformedValues,
        {
          headers: headers,
        }
      );
      console.log(res);
      toast.success("Product updated");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      console.log(err?.response?.data?.data);
      toast.error(err?.response?.data?.data || err.error);
    }
  };
  useEffect(() => {
    if (targetUser) {
      setFirstName(targetUser.firstname || "");
      setLastName(targetUser.lastname || "");
      setRole(targetUser.role || "");
      setEmail(targetUser.email || "");
    }
  }, [targetUser]);
  return (
    <>
      <Link
        to="/admin/userlist"
        relative="path"
        className="dark:text-white mx-auto flex max-w-2xl items-center space-x-2 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        &larr; <span className="ml-2 dark:text-white">Back to User List</span>
      </Link>
      <Card
        color="transparent"
        shadow={false}
        className="h-screen min-w-max  m-auto flex flex-col  justify-center items-center"
      >
        <form onSubmit={submitHandler} className="mt-8 mb-2 min-w-max  sm:w-96">
          <div className="mb-1 flex flex-col gap-6 grid grid-cols-2  gap-4">
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              First Name
            </Typography>
            <Input
              name="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              id="firstname"
              size="lg"
              placeholder="John"
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
              Last Name
            </Typography>
            <Input
              name="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              id="lastname"
              size="lg"
              placeholder="Doe"
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
              Email
            </Typography>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              size="lg"
              placeholder="email@email.com"
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
              Role
            </Typography>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              id="role"
              className="!border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white focus:!border-t-gray-900 dark:bg-[#1C1E2D] "
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="SELLER">SELLER</option>
            </select>
          </div>

          {isLoading && <CustomSpinner />}
          <Button
            className="mt-6 bg-[#151725] hover:bg-[#151729]"
            fullWidth
            disabled={isLoading}
            type="submit"
            onSubmit={submitHandler}
          >
            {isLoading ? "Updating..." : "Update User"}
          </Button>
        </form>
      </Card>
    </>
  );
}
