import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((store) => store.auth.userInfo);

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
            <About user={user} />
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
        {user.name}
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
function About({ user }) {
  return (
    <div className="bg-white p-3 shadow-sm rounded-sm  dark:bg-[#1C1E2D]">
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
              {user.name.split(" ")[0]}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold dark:text-white">
              Last Name:
            </div>
            <div className="px-4 py-2 dark:text-white">
              {user.name.split(" ")[1]}
            </div>
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
              {/* Beech Creek, PA, Pennsylvania */}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold dark:text-white">
              Permanant Address:
            </div>
            <div className="px-4 py-2 dark:text-white">
              {/* Arlington Heights, IL, Illinois */}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold dark:text-white">
              Email:
            </div>
            <div className="px-4 py-2">
              <div className="text-blue-800 dark:text-white">{user.email}</div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold dark:text-white">
              Birthday:
            </div>
            {/* <div className="px-4 py-2 dark:text-white">Feb 06, 1998</div> */}
          </div>
        </div>
      </div>
      <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4 dark:hover:bg-[#151725] dark:focus:bg-[#151725]">
        Edit Information
      </button>
    </div>
  );
}
