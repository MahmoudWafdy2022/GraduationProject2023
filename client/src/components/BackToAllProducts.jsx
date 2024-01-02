import { Link } from "react-router-dom";
export default function BackToAllProducts() {
  return (
    <>
      <Link
        to="/products/page/1"
        className="dark:text-white mx-auto flex max-w-2xl items-center space-x-2 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        &larr; <span className="ml-2 dark:text-white">Back to all product</span>
      </Link>
    </>
  );
}
