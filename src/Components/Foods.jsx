import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    axios.get(`${API_BASE_URL}/foods`)
      .then((response) => {
        const sortedFoods = response.data.sort(
          (a, b) => b.quantity - a.quantity
        );
        setFoods(sortedFoods.slice(0, 6));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className=" px-4 md:px-10 lg:px-20 py-20 lg:py-40">
      <span className="text-4xl font-bold border-b-8 border-blue1 pb-2">
        Foods
      </span>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:justify-between items-center gap-10 lg:gap-14 mt-20">
        {foods.map((food) => (
          <div key={food._id}>
            <img src={food.image} className="rounded-t-xl" />
            <div className="bg-blue2 rounded-b-xl p-5">
              <div className="text-dark1">
                <h3 className="text-2xl font-semibold pb-4">{food.name}</h3>
                <div className="flex flex-col gap-3 text-blue1">
                  <p>
                    Quantity:
                    <span className="text-dark2 pl-2">{food.quantity}</span>
                  </p>
                  <p>
                    Pickup Location:
                    <span className="text-dark2 pl-2 text-sm">
                      {food.location}
                    </span>
                  </p>
                  <p>
                    Expired Date/Time:
                    <span className="text-dark2 pl-2">{food.time}</span>
                  </p>
                  <p>
                    Additional Notes:
                    <span className="text-dark2 text-sm pl-2">
                      {food.notes}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center border-t-2 border-blue1 pt-5 mt-4">
                <div className="flex items-center gap-2 w-1/2">
                  <img
                    src={food.userImage}
                    className="h-10 w-10 rounded-full"
                  />
                  <p className="text-dark1">{food.userName}</p>
                </div>
                <Link to={`/food/${food._id}`}>
                  <button className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-6">
                    View Detail
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/availableFoods" className="flex justify-center">
        <button className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-6 mt-16 md:mt-20">
          Show All
        </button>
      </Link>
    </div>
  );
};

export default Foods;
