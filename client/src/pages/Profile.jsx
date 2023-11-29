import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
// import { useNavigate } from "react-router-dom";
import CustomSpinner from "../components/CustomSpinner";
export default function Profile() {
  const user = useSelector((store) => store.auth.userInfo);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const dispatch = useDispatch();

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
            <About
              user={user}
              shippingAddress={shippingAddress}
              updateProfile={updateProfile}
              dispatch={dispatch}
              userInfo={userInfo}
              loadingUpdateProfile={loadingUpdateProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
function ProfileCard({ user }) {
  return (
    <div className="bg-white p-3  dark:bg-[#1C1E2D] ">
      {/* <div className="image overflow-hidden">
        <img
          className="h-auto w-full mx-auto"
          src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
          alt=""
        />
      </div> */}
      <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 dark:text-white">
        {user.firstname} {user.lastname}
      </h1>
      <h3 className="text-gray-600 font-lg text-semibold leading-6 dark:text-white">
        {/* Owner at Her Company Inc. */}
      </h3>
      <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 dark:text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit,
        eligendi dolorum sequi illum qui unde aspernatur non deserunt
      </p>
      {/* <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
      <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                </li>
      <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">Nov 07, 2016</span>
                </li>
      </ul> */}
    </div>
  );
}
function About({
  user,
  shippingAddress,
  updateProfile,
  dispatch,
  userInfo,
  loadingUpdateProfile,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    password: "",
    confirmPassword: "",
  });
  // const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const validatePassword = () => {
    // Password validation logic
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(editedUser.password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to send a POST request to the backend with editedUser data

    if (editedUser.password !== editedUser.confirmPassword) {
      // Display an error message or handle the mismatch case
      toast.error("Password and Confirm Password do not match");
      return;
    }
    if (!validatePassword()) {
      toast.error(
        "Password must be at least 8 characters long and contain letters, symbols, and numbers."
      );
      return;
    }
    const { firstname, lastname, password } = editedUser;

    try {
      const res = await updateProfile({
        id: userInfo.id,
        firstname,
        lastname,
        password,
        token: userInfo.token,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

    // Reset the edit mode after saving
    setIsEdit(false);
  };

  return (
    <div className="bg-white p-3 shadow-sm rounded-sm  dark:bg-[#1C1E2D]">
      {isEdit ? (
        <>
          <div className="bg-white p-3 shadow-sm rounded-sm  dark:bg-[#1C1E2D]">
            <form onSubmit={handleSubmit}>
              {/* Input fields for editing */}
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2 py-2">
                  <div className="px-4 py-2 font-semibold dark:text-white ">
                    First Name:
                  </div>
                  <Input
                    type="text"
                    name="firstname"
                    value={editedUser.firstname}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white dark:focus:!border-gray-700 "
                    labelProps={{
                      className:
                        "before:content-none after:content-none dark:text-white",
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 py-2">
                  <div className="px-4 py-2 font-semibold dark:text-white">
                    Last Name:
                  </div>
                  <Input
                    type="text"
                    name="lastname"
                    value={editedUser.lastname}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white dark:focus:!border-gray-700 "
                    labelProps={{
                      className:
                        "before:content-none after:content-none dark:text-white",
                    }}
                  />
                </div>
                {/* ... (other input fields) ... */}
                <div className="grid grid-cols-2 py-2">
                  <div className="px-4 py-2 font-semibold dark:text-white">
                    Password:
                  </div>
                  <Input
                    type="password"
                    name="password"
                    value={editedUser.password}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white dark:focus:!border-gray-700 "
                    labelProps={{
                      className:
                        "before:content-none after:content-none dark:text-white",
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 py-2">
                  <div className="px-4 py-2 font-semibold dark:text-white">
                    Confirm Password:
                  </div>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={editedUser.confirmPassword}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white dark:focus:!border-gray-700 "
                    labelProps={{
                      className:
                        "before:content-none after:content-none dark:text-white",
                    }}
                  />
                </div>
              </div>
              {/* Save button */}
              <button
                type="submit"
                className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4 dark:hover:bg-[#151725] dark:focus:bg-[#151725]"
              >
                Save Information
              </button>
              {loadingUpdateProfile && <CustomSpinner />}
            </form>
            <button
              className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4 dark:hover:bg-[#151725] dark:focus:bg-[#151725]"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span className="text-green-500">
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span className="tracking-wide dark:text-white">About</span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold dark:text-white">
                  First Name:
                </div>
                <div className="px-4 py-2 dark:text-white">
                  {user.firstname}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold dark:text-white">
                  Last Name:
                </div>
                <div className="px-4 py-2 dark:text-white">{user.lastname}</div>
              </div>
              <div className="grid grid-cols-2">
                {/* <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">Female</div> */}
              </div>
              <div className="grid grid-cols-2">
                {/* <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">+11 998001001</div> */}
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold dark:text-white">
                  Current Address:
                </div>
                <div className="px-4 py-2 dark:text-white">
                  {shippingAddress?.address}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold dark:text-white">
                  City:
                </div>
                <div className="px-4 py-2 dark:text-white">
                  {shippingAddress?.selectedCity?.label}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold dark:text-white">
                  Email:
                </div>
                <div className="px-4 py-2">
                  <div className="text-blue-800 dark:text-white">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold dark:text-white">
                  Country:
                </div>
                <div className="px-4 py-2 dark:text-white">
                  {shippingAddress?.selectedCountry?.label}
                </div>
              </div>
            </div>
          </div>
          <button
            className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4 dark:hover:bg-[#151725] dark:focus:bg-[#151725]"
            onClick={() => setIsEdit(true)}
          >
            Edit Information
          </button>
        </>
      )}
    </div>
  );
}
