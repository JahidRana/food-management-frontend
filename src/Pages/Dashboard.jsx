import { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";
import Lottie from "react-lottie";
import registrationAnimation from "../assets/registration.json";
import Statistics from "../Components/Statistics";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { user } = useContext(AuthContext);
  const [totalFood, setTotalFood] = useState([]);
  const [totalRequestedFood, setTotalRequestedFood] = useState([]);
  const [myTotalFood, setMyTotalFood] = useState(0);
  const [myTotalRequestedFood, setMyTotalRequestedFood] = useState(0);

  useEffect(() => {
    const fetchTotalFood = async () => {
      try {
       
        const response = await axios.get(
          `${API_BASE_URL}/foods`
        );
        const data = response.data;

        setTotalFood(data);

        const myTotalFoods = data.filter(
          (food) => food.userEmail === user.email
        );
        setMyTotalFood(myTotalFoods.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTotalFood();
  }, [user.email]);

  useEffect(() => {
    const fetchTotalRequestedFood = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/foodRequest`
        );
        const data = response.data;
        setTotalRequestedFood(data);
        const myTotalRequestedFoods = data.filter(
          (food) => food.userEmail === user.email
        );
        setMyTotalRequestedFood(myTotalRequestedFoods.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTotalRequestedFood();
  }, [user.email]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registrationAnimation,
  };

  return (
    <div className="relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Unity | Dashboard</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="absolute top-0 z-50 w-full">
        <Navbar />
      </div>
      <div className="lg:flex gap-16 px-4 md:px-10 lg:px-20 pb-20 pt-28 md:pt-40">
        <div className="lg:w-2/3 pb-16 lg:pb-0">
          <div className="grid lg:grid-cols-2 items-center border-2 border-blue1 rounded-3xl lg:pl-10 p-6 md:px-14 md:pt-12 lg:px-0 lg:py-0 mb-16">
            <div className="text-4xl md:text-5xl font-bold leading-10 md:leading-[68px] pb-10 lg:pb-0">
              See, Understand, Act: Your Data Dashboard
            </div>
            <div>
              <Lottie options={defaultOptions} />
            </div>
          </div>

          {/* food related information */}

          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 md:flex-row justify-between items-center md:items-start gap-16">
              <div className="flex flex-col justify-center items-center border-2 border-blue1 rounded-3xl w-full h-52">
                <div className="text-9xl font-semibold text-blue1">
                  {myTotalFood}
                </div>
                <p className="text-lg font-bold">Foods added by me</p>
              </div>
              <div className="flex flex-col justify-center items-center border-2 border-blue1 rounded-3xl w-full h-52">
                <div className="text-9xl font-semibold text-blue1">
                  {myTotalRequestedFood}
                </div>
                <p className="text-lg font-bold">Foods requested by me</p>
              </div>
            </div>
          </div>
        </div>

        {/* pie chart */}

        <div className="border-2 border-blue1 rounded-3xl lg:w-1/3">
          <Statistics
            myTotalFood={myTotalFood}
            myTotalRequestedFood={myTotalRequestedFood}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

