import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function DefaultPagination({
  activePage,
  totalPages,
  onPageChange,
}) {
  const [active, setActive] = React.useState(activePage);

  React.useEffect(() => {
    // Update the active state when the prop changes
    setActive(activePage);
  }, [activePage]);
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "white ",
    onClick: () => {
      setActive(index);
      onPageChange(index);
    },
  });

  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
    onPageChange(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
    onPageChange(active - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 dark:text-white"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 " /> Previous
      </Button>
      <div className="flex items-center gap-2 ">
        {[...Array(totalPages).keys()].map((index) => (
          <IconButton
            className="dark:text-white"
            key={index}
            {...getItemProps(index + 1)}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 dark:text-white"
        onClick={next}
        disabled={active === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
