import { Spinner } from "@material-tailwind/react";

export default function CustomSpinner() {
  return (
    // text-gray-900/50"
    <Spinner className="h-screen absolute right-1/2 top-1/2 flex items-center justify-center h-16 w-16 text-gray-900/50 dark:text-white" />
  );
}
