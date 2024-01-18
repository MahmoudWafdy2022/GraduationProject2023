import { Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/users/reset-password-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        // Handle success, show a message to the user
        toast.success("Password reset link sent successfully");
        console.log("Password reset link sent successfully");
      } else {
        // Handle error, show an error message to the user
        console.error("Failed to send reset password link");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="h-screen w-full max-w-xs m-auto flex flex-col  justify-center items-center"
    >
      {/* <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300"> */}
      <Typography variant="h3" color="blue-gray" className="dark:text-white">
        Reset password
      </Typography>
      <Typography color="gray" className="mt-1 dark:text-white font-normal">
        Fill up the form to reset the password
      </Typography>

      <form action="" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="flex flex-col space-y-5">
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2 dark:text-white">
              Email address
            </p>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button
            onClick={handleResetPassword}
            className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>

            <span>Reset password</span>
          </button>
          <p className="text-center dark:text-white">
            Not registered yet?{" "}
            <a
              href="#"
              className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
            >
              <span>Register now </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>
          </p>
        </div>
      </form>
      {/* </div> */}
    </Card>
  );
}
