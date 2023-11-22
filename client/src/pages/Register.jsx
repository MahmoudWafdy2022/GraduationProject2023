import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link, useNavigation } from "react-router-dom";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
function Register() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (values) => {
    try {
      console.log(values);
      await axios.post("http://localhost:3001/users/register", values);

      return navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <Card
      color="transparent"
      shadow={false}
      className="h-screen w-full max-w-xs m-auto flex flex-col  justify-center items-center"
    >
      <Typography variant="h4" color="blue-gray" className="dark:text-white">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal dark:text-white">
        Enter your details to register.
      </Typography>
      {err && <p className="text-red-500 text-xs italic">{err}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6 ">
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 after:content-['*'] after:ml-0.5 after:text-red-500 dark:text-white"
          >
            Your Name
          </Typography>
          <Input
            name="name"
            type="name"
            id="name"
            size="lg"
            placeholder="john doe"
            {...register("name", {
              required: "Required",
            })}
            aria-invalid={errors.name ? "true" : "false"}
            className={
              " !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-blue-gray-200 dark:text-white"
            }
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.name?.type === "required" && (
            <p
              className="m-0 visible peer-invalid:visible text-pink-600 text-sm"
              role="alert"
            >
              Name is required
            </p>
          )}
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 after:content-['*'] after:ml-0.5 after:text-red-500 dark:text-white"
          >
            Your Email
          </Typography>
          <Input
            name="email"
            type="email"
            id="email"
            size="lg"
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-blue-gray-200 dark:text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.email && (
            <p
              className="m-0 visible peer-invalid:visible text-pink-600 text-sm"
              role="alert"
            >
              {errors?.email?.message}
            </p>
          )}

          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 after:content-['*'] after:ml-0.5 after:text-red-500 dark:text-white"
          >
            Password
          </Typography>
          <Input
            name="password"
            id="password"
            type="password"
            size="lg"
            {...register("password", {
              required: "Required",
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                message:
                  "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-blue-gray-200 dark:text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.password && (
            <p
              className="m-0 visible peer-invalid:visible text-pink-600 text-sm "
              role="alert"
            >
              {errors?.password?.message}
            </p>
          )}
        </div>

        <Button
          className="mt-6 dark:bg-[#151725] dark:hover:bg-[#151729]"
          fullWidth
          disabled={navigation.state === "submitting"}
          type="submit"
        >
          {navigation.state === "submitting" ? "Register in..." : "Register"}
        </Button>
        <Typography
          color="gray"
          className="mt-4 text-center font-normal dark:text-white"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="dark:text-blue-600 font-medium text-gray-900"
          >
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
export default Register;
