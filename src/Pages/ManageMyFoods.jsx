import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import CancelFood from "../Components/CancelFood";
import { Helmet } from "react-helmet";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";

const ManageMyFoods = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const [userFoods, setUserFoods] = useState([]);
  const [foods, setFoods] = useState([]);

  const url = `/foods?email=${user?.email}`;

  useEffect(() => {
    axiosSecure.get(url).then((res) => setUserFoods(res.data));

    const userFood = userFoods.filter((food) => food.userEmail === user.email);
    setFoods(userFood);
  }, [userFoods, user.email, axiosSecure, url]);

  return (
    <div className="relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Unity | Manage My Foods</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="relative overflow-x-auto mx-4 md:mx-10 lg:mx-20 pt-32 md:pt-40">
        <span className=" sticky left-0 text-4xl font-bold border-b-8 border-blue1 pb-2">
          Manage My Food
        </span>

        {/* my food table */}

        <table className="table table-md lg:table-lg table-pin-rows table-pin-cols mt-20">
          <thead className="text-[17px]">
            <tr>
              <th></th>
              <td>Food Name</td>
              <td>Pickup Location</td>
              <td>Expired Date/Time</td>
              <td>Status</td>
              <td className="text-center">Update</td>
              <td className="text-center">Delete</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, idx) => (
              <CancelFood
                key={idx}
                food={food}
                foods={foods}
                setFoods={setFoods}
              ></CancelFood>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 md:px-10 lg:px-20 pt-12 pb-16">
        {/* manage action */}

        <Link to={"/manageFood"} className="">
          <button className="btn normal-case lg:col-span-2 text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-10 mt-4 m-auto">
            Manage
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ManageMyFoods;
