import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
export default function HomePageHeader() {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Carousel
      autoplay={true}
      loop={true}
      autoplayDelay={5000}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className="relative max-h-[600px] m-auto w-full z-10">
        <LazyLoadImage
          src="/assets/header-1.jpg"
          alt="image 1"
          className="max-h-[600px] w-full object-cover"
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Smartphones
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-8 xs:mb-4 text-1xl opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
            <div className="flex gap-2 xs:hidden">
              <Link to="/register">
                <Button size="md" color="white">
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button size="md" color="white" variant="text">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-h-[600px] m-auto w-full z-10">
        <LazyLoadImage
          src="/assets/header-2.jpg"
          alt="image 2"
          className="max-h-[600px] w-full object-cover"
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Laptops
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-8 xs:mb-4 text-1xl opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
            <div className="flex gap-2 xs:hidden">
              <Link to="/register">
                <Button size="md" color="white">
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button size="md" color="white" variant="text">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-h-[600px] m-auto w-full z-10">
        <LazyLoadImage
          src="/assets/header-3.jpg"
          alt="image 3"
          className="max-h-[600px] w-full object-cover"
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Headphones
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-8 xs:mb-4 text-1xl opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
            <div className="flex gap-2 xs:hidden">
              {isLoaded && (
                <>
                  <Link to="/register">
                    <Button size="md" color="white">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="md" color="white" variant="text">
                      Sign in
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
