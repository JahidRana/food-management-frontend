import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import RequestModal from "../Components/RequestModal";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const FoodDetails = () => {
  const food = useLoaderData();

  const { image, name, quantity, location, time, userName } = food;

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(scrollToTop, []);

  return (
    <div className="relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Unity | Food Details</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="absolute top-0 z-50 w-full">
        <Navbar />
      </div>
      <div className="lg:flex justify-center gap-10 px-4 md:px-10 lg:px-20 pb-20 pt-28 md:pt-36 lg:pt-48 lg:pb-40">
        <img src={image} className="w-full md:w-[500px] rounded-2xl" />
        <div className="relative pb-24 lg:pb-0">
          {/* donor information */}

          <div className="border-b-4 border-blue1 space-y-2 md:pr-60 pb-10 mb-10 mt-10 lg:mt-0">
            <p>
              <span className="font-semibold">Donor Name: </span>
              {userName}
            </p>
            <p>
              <span className="font-semibold">Pickup Location: </span>
              {location}
            </p>
          </div>

          {/* food information */}

          <div className="space-y-2">
            <p className="text-5xl font-medium pb-3">{name}</p>
            <p>
              <span className="font-semibold">Quantity: </span>
              {quantity}
            </p>
            <p>
              <span className="font-semibold">Expired Date/Time: </span>
              {time}
            </p>
          </div>
     <div>
     <Link className="absolute">
            <button
              onClick={() => document.getElementById("modal").showModal()}
              className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-10">
            
              Request
            </button>
          </Link>
     </div>
          

          {/* request button and modal */}

          {/* <Link className="absolute bottom-0">
          <button
    onClick={() => document.getElementById("modal").showModal()}
    className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-10 space-x-9"
  >
    Request
  </button>
          </Link> */}
          <dialog id="modal" className="modal modal-middle">
            <div className="modal-box">
              <RequestModal food={food} />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-10 mt-4">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FoodDetails;