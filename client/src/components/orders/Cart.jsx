export default function Cart({ cart }) {
  const mappedElements = cart.map((c) => (
    <div key={c._id}>
      <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full py-4 border-b border-gray-200">
        <div className="w-full md:w-40">
          <img
            className="w-full hidden md:block"
            src={
              c.image.includes("/uploads")
                ? `http://localhost:3001${c.image}`
                : c.image
            }
            alt={c.name}
          />
        </div>
        <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="w-full flex flex-col justify-start items-start space-y-8">
            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
              {c.name}
            </h3>
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-sm dark:text-white leading-none text-gray-800">
                <span className="dark:text-gray-400 text-gray-300">
                  Brand:{" "}
                </span>{" "}
                {c.brand}
              </p>
              <p className="text-sm dark:text-white leading-none text-gray-800">
                <span className="dark:text-gray-400 text-gray-300">
                  Category:{" "}
                </span>{" "}
                {c.category}
              </p>
            </div>
          </div>
          <div className="flex justify-between space-x-8 items-start w-full">
            <p className="text-base dark:text-white xl:text-lg leading-6">
              ${c.price}{" "}
            </p>
            <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
              {c.qty}
            </p>
            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
              ${(c.price * c.qty).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  ));
  return mappedElements;
}
