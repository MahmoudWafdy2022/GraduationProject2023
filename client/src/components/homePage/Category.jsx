import { useTranslation } from "react-i18next";
import { useGetCategoryQuery } from "../../slices/productsApiSlice";
import { Link } from "react-router-dom";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
// const products = [
//   {
//     id: 1,
//     name: "Earthen Bottle",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
//     imageAlt:
//       "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
//   },
//   {
//     id: 2,
//     name: "Nomad Tumbler",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
//     imageAlt:
//       "Olive drab green insulated bottle with flared screw lid and flat top.",
//   },
//   {
//     id: 3,
//     name: "Focus Paper Refill",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
//     imageAlt:
//       "Person using a pen to cross a task off a productivity paper card.",
//   },
//   {
//     id: 4,
//     name: "Machined Mechanical Pencil",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
//     imageAlt:
//       "Hand holding black machined steel mechanical pencil with brass tip and top.",
//   },
//   // More products...
// ];

export default function Category() {
  const { t } = useTranslation();
  const { data } = useGetCategoryQuery();
  const subCategories = data?.data?.listOfCategories;
  const products = subCategories?.map((el, i) => {
    //           {t("categories.categories")}
    return {
      id: el._id,
      name: t(`categories.${el.name}`),
      imageAlt: t(`categories.${el.name}`),
      imageSrc: `/assets/header-${i + 1}.jpg`,
      href: el.name,
    };
  });

  console.log(subCategories);
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products?.map((product) => (
          <Link
            key={product.id}
            to={`/products/page/1/?category=${encodeURIComponent(
              product.href
            )}`}
            className="group"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700 dark:text-white">
              {product.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
