import { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import CancelRequest from "../Components/CancelRequest";
import Lottie from "react-lottie";
import notFound from "../assets/notFound.json";
import { AuthContext } from "../Providers/AuthProvider";
import { Helmet } from "react-helmet";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [foods, setFoods] = useState([]);

  const url = `/foodRequest?email=${user?.email}`;

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(url)
        .then((res) => {
          console.log(res.data);  // Log the response data
          const foodsArray = Array.isArray(res.data) ? res.data : [];
          setFoods(foodsArray);  // Set foods state with valid data
        })
        .catch((error) => {
          console.error("Error fetching food requests:", error);
        });
    }
  }, [axiosSecure, url, user?.email]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
  };

  return (
    <div className="relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Unity | My Food Request</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="overflow-x-auto mx-4 md:mx-10 lg:mx-20 pt-32 md:pt-40 mb-20">
        <span className="sticky left-0 text-4xl font-bold border-b-8 border-blue1 pb-2">
          My Food Request
        </span>
        {!foods.length ? (
          <div>
            <div className="h-[400px] mt-10 -mb-20">
              <Lottie options={defaultOptions} />
            </div>
          </div>
        ) : (
          <table className="table table-md lg:table-lg table-pin-rows table-pin-cols mt-20">
            <thead className="text-[17px]">
              <tr>
                <th></th>
                <td>Donator Name</td>
                <td>Food Name</td>
                <td>Pickup Location</td>
                <td>Expired Date</td>
                <td>Request Date</td>
                <td>Your Donation Amount</td>
                <td>Status</td>
                <td className="text-center">Cancel Request</td>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food, idx) => (
                <CancelRequest
                  key={idx}
                  food={food}
                  foods={foods}
                  setFoods={setFoods}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyFoodRequest;
