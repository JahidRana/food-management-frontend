import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Helmet } from "react-helmet";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import ManageFood from "../Components/ManageFood";

const FoodManagement = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const [userFoods, setUserFoods] = useState([]);
  const [foods, setFoods] = useState([]);

  const url = `/foodRequest?email=${user?.email}`;

  useEffect(() => {
    axiosSecure.get(url).then((res) => setUserFoods(res.data));

    const userFood = userFoods.filter(
      (food) => food.donatorEmail === user.email
    );
    setFoods(userFood);
  }, [userFoods, user.email, axiosSecure, url]);

  return (
    <div className="relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Unity | Manage</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="overflow-x-auto mx-4 md:mx-10 lg:mx-20 pt-32 md:pt-40 pb-20">
        <span className="sticky left-0 text-4xl font-bold border-b-8 border-blue1 pb-2">
          Manage
        </span>

        {/* my food table */}

        <table className="table table-md lg:table-lg table-pin-rows table-pin-cols mt-20">
          <thead className="text-[17px]">
            <tr>
              <th></th>
              <td>Requester Image</td>
              <td>Requester Name</td>
              <td>Requester Email</td>
              <td>Requester Date/Time</td>
              <td className="text-center">Status</td>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, idx) => (
              <ManageFood
                key={idx}
                food={food}
                foods={foods}
                setFoods={setFoods}
              ></ManageFood>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default FoodManagement;
