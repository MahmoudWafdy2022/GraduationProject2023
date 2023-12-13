import { RatingWithText } from "./RatingWithText";
export default function Reviews({ product }) {
  const reviews = product?.reviews;
  return (
    <ul className="p-5 ">
      {reviews.map((r, i) => (
        <li className="py-8 text-left  px-4 m-2 " key={i}>
          <div className="flex items-start">
            <img
              className="block h-10 w-10 max-w-full justify-self-center  self-center	flex-shrink-0 rounded-full align-middle"
              src="/assets/avatar.png"
              alt="avatar"
            />
            <div className="ml-3">
              <p className="mt-5 text-sm font-bold text-black dark:text-white">
                {r.name}
              </p>
              <div className="flex items-center pt-3">
                <RatingWithText
                  rating={r.rating}
                  reviews={product.numReviews}
                  showText={false}
                />
              </div>
              <p className="mt-5 text-base text-black dark:text-white">
                {r.comment}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
