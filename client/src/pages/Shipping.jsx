import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { saveShippingAddress } from "../slices/cartSlice";
import useRedirect from "../utils/useRedirect";
export default function Shipping() {
  useRedirect();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [addressError, setAddressError] = useState("");

  const [allCities, setAllCities] = useState([]);
  // const [city, setCity] = useState(shippingAddress.city || "");
  const [selectedCity, setSelectedCity] = useState(
    shippingAddress.selectedCity || null
  );
  const [cityError, setCityError] = useState("");

  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [postalCodeError, setPostalCodeError] = useState("");

  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(
    shippingAddress.selectedCountry || null
  );
  const [countryError, setCountryError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const excludeFlags = [
  //   "BL",
  //   "BQ",
  //   "BV",
  //   "GF",
  //   "GP",
  //   "HM",
  //   "IQ",
  //   "SX",
  //   "SJ",
  //   "PM",
  //   "UM",
  //   "XK",
  // ];

  useEffect(() => {
    // Fetch countries from GeoNames API
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "http://api.geonames.org/countryInfoJSON?username=xxxatlas69"
        );
        const data = await response.json();
        // Extract relevant information from the API response
        const countriesData = data.geonames.map((country) => ({
          value: country.countryCode,
          label: country.countryName,
          // Add the country flag URL to each option
          // https://flagsapi.com/EG/flat/32.png
          // ${

          //     ? ""
          //     : country.countryCode
          // }
          image: `${
            [
              "BL",
              "BQ",
              "BV",
              "GF",
              "GP",
              "HM",
              "IO",
              "SX",
              "SJ",
              "PM",
              "UM",
              "XK",
            ].includes(country.countryCode)
              ? ""
              : `https://flagsapi.com/${country.countryCode}/flat/24.png`
          }`,
        }));

        setAllCountries(countriesData);
      } catch (error) {
        setCountryError(`Error fetching countries: ${error}`);
      }
    };

    fetchCountries();
  }, []); // Run this effect only once on component mount

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry) {
        try {
          const response = await fetch(
            `http://api.geonames.org/searchJSON?country=${selectedCountry.value}&username=xxxatlas69`
          );
          const data = await response.json();

          const citiesData = data.geonames.map((city) => {
            if (city.name === selectedCountry.label) return {};
            return {
              value: city.geonameId,
              label: city.name,
            };
          });

          setAllCities(citiesData);
        } catch (error) {
          setCityError(`Error fetching cities: ${error}`);
        }
      }
    };

    fetchCities();
  }, [selectedCountry]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setCountryError("");
    // Reset city when country changes
    setSelectedCity(null);
  };
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };
  const validateAddress = () => {
    if (!address) {
      setAddressError("Address is required");
    } else {
      setAddressError("");
    }
  };
  const validateCity = () => {
    if (!selectedCity) {
      setCityError("City is required");
    } else {
      setCityError("");
    }
  };

  const validatePostalCode = () => {
    if (!postalCode.trim()) {
      setPostalCodeError("Postal Code is required");
    } else {
      setPostalCodeError("");
    }
  };

  const validateCountry = () => {
    if (!selectedCountry) {
      setCountryError("Country is required");
    } else {
      setCountryError("");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    validateAddress();
    validateCity();
    validateCountry();
    validatePostalCode();

    if (address && selectedCity && postalCode && selectedCountry) {
      dispatch(
        saveShippingAddress({
          address,
          selectedCity,
          postalCode,
          selectedCountry,
        })
      );
      navigate("/payment");
    }
  }
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid #ccc",
      display: "flex",
      color: state.isSelected ? "white" : "white",
      background: state.isSelected ? "#007BFF" : "white",
      "&:hover": {
        background: "#007BFF",
        color: "white",
        cursor: "pointer",
      },
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      // background: isDark ? "#616161" : "#fff",
      // color: isDark ? "white" : "black",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      // color: isDark ? "white" : "black",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "2px 8px",
    }),
  };
  const cityOption = ({ innerProps, label, data }) => {
    if (!data.label) return;
    return (
      <div {...innerProps} className="flex w-full">
        <span className="cursor-pointer ml-3 py-2">{label}</span>
      </div>
    );
  };
  const countryOption = ({ innerProps, label, data }) => {
    if (!data.image) return;
    return (
      <div {...innerProps} className="flex w-full p-2">
        <LazyLoadImage
          src={data.image}
          alt={label}
          style={{ marginRight: "8px" }}
          className="cursor-pointer"
        />
        <span className="cursor-pointer ">{label}</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 dark:bg-[#1C1E2D] h-screen w-full">
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white dark:bg-[#1C1E2D] p-8 rounded-lg shadow-md border dark:border-[#242635]">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Checkout
          </h1>
          <ShippingSteps />
          {/* <!-- Shipping Address --> */}
          <ShippingAddress>
            <form className="mb-6" onSubmit={(e) => handleSubmit(e)}>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                Shipping Address
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Address
                </label>
                <input
                  value={address}
                  onChange={(e) => {
                    const trimmedAddress = e.target.value.trimStart().trimEnd();

                    setAddress(trimmedAddress);
                    validateAddress();
                  }}
                  type="text"
                  id="address"
                  className="w-full border py-2 px-3"
                />
                <p className="text-red-500">{addressError}</p>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="country"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Country
                </label>

                <Select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  options={allCountries}
                  id="country"
                  styles={customStyles}
                  components={{ Option: countryOption }}
                  isDarkMode={JSON.parse(localStorage.getItem("darkMode"))}
                />

                <p className="text-red-500">{countryError}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    City
                  </label>

                  <Select
                    value={selectedCity}
                    onChange={handleCityChange}
                    options={allCities}
                    isDisabled={!selectedCountry}
                    id="city"
                    styles={customStyles}
                    components={{ Option: cityOption }}
                  />

                  <p className="text-red-500">{cityError}</p>
                </div>
                <div>
                  <label
                    htmlFor="postal"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      setPostalCode(numericValue);
                      validatePostalCode();
                    }}
                    id="postal"
                    className="w-full border py-2 px-3"
                  />
                  <p className="text-red-500">{postalCodeError}</p>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700"
                  disabled={
                    addressError || cityError || postalCodeError || countryError
                  }
                >
                  Go to Payment
                </button>
              </div>
            </form>
          </ShippingAddress>

          {/* <!-- Payment Information --> */}
          {/* <PaymentInfo /> */}
        </div>
      </div>
    </div>
  );
}
function ShippingSteps() {
  return (
    <div className="flex items-center justify-center mb-3">
      <Link
        to="/cart"
        className="flex text-sm text-blue-500 focus:outline-none"
      >
        <span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">
          1
        </span>{" "}
        Cart
      </Link>
      <button
        className="flex text-sm text-gray-700 ml-8 focus:outline-none"
        disabled
      >
        <span className="flex items-center justify-center border-2 border-blue-500 rounded-full h-5 w-5 mr-2">
          2
        </span>{" "}
        Shipping
      </button>
      <button
        className="flex text-sm text-gray-500 ml-8 focus:outline-none"
        disabled
      >
        <span className="flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mr-2">
          3
        </span>{" "}
        Payments
      </button>
      <button
        className="flex text-sm text-gray-500 ml-8 focus:outline-none"
        disabled
      >
        <span className="flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mr-2">
          4
        </span>{" "}
        Place Order
      </button>
    </div>
  );
}
function ShippingAddress({ children }) {
  return children;
}
// function PaymentInfo() {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
//         Payment Information
//       </h2>
//       <div className="mt-4">
//         <label
//           htmlFor="card_number"
//           className="block text-gray-700 dark:text-white mb-1"
//         >
//           Card Number
//         </label>
//         <input
//           type="text"
//           id="card_number"
//           className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4 mt-4">
//         <div>
//           <label
//             htmlFor="exp_date"
//             className="block text-gray-700 dark:text-white mb-1"
//           >
//             Expiration Date
//           </label>
//           <input
//             type="text"
//             id="exp_date"
//             className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="cvv"
//             className="block text-gray-700 dark:text-white mb-1"
//           >
//             CVV
//           </label>
//           <input
//             type="text"
//             id="cvv"
//             className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
