import { Helmet } from "react-helmet";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateFood = () => {
  const food = useLoaderData();
  const navigate = useNavigate();

  const { name, image, location, time, notes } = food;

  const handleUpdateFood = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const image = form.get("image");
    const location = form.get("location");
    const time = form.get("time");
    const notes = form.get("notes");

    const updateFood = {
      name,
      image,
      location,
      time,
      notes,
    };
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    axios.put(
        `${API_BASE_URL}/food/${food._id}`,
        updateFood,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
      
        if (response.data.acknowledged) {
          Swal.fire({
            title: "Success!",
            text: "Product updated successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          navigate(-1);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Unity | Update Food</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Navbar />
      <div>
        <div className="px-4 md:px-10 lg:px-20 py-20 lg:py-40">
          <span className="text-4xl font-bold border-b-8 border-blue1 pb-2">
            Update Food
          </span>

          {/* update food form */}

          <form
            onSubmit={handleUpdateFood}
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 pt-16"
          >
            {/* food name */}

            <div className="border-b-2 border-dark2">
              <p className="text-lg text-blue1">Food Name</p>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={name}
                required
                className="focus:outline-none bg-transparent w-full px-4 py-2"
              />
            </div>

            {/* food image */}

            <div className="border-b-2 border-dark2">
              <p className="text-lg text-blue1">Food Image ULR</p>
              <input
                type="text"
                name="image"
                id="image"
                defaultValue={image}
                required
                className="focus:outline-none bg-transparent w-full px-4 py-2"
              />
            </div>

            {/*food location */}

            <div className="border-b-2 border-dark2">
              <p className="text-lg text-blue1">Food Pickup Location</p>
              <input
                type="text"
                name="location"
                id="location"
                defaultValue={location}
                required
                className="focus:outline-none bg-transparent w-full px-4 py-2"
              />
            </div>

            {/*expired time */}

            <div className="border-b-2 border-dark2">
              <p className="text-lg text-blue1">Expired Date/time</p>
              <input
                type="text"
                name="time"
                id="time"
                defaultValue={time}
                required
                className="focus:outline-none bg-transparent w-full px-4 py-2"
              />
            </div>

            {/*notes */}

            <div className="border-b-2 lg:col-span-2 border-dark2">
              <p className="text-lg text-blue1">Additional Notes</p>
              <textarea
                type="text"
                name="notes"
                id="notes"
                defaultValue={notes}
                required
                className="focus:outline-none bg-transparent w-full px-4 py-2"
              />
            </div>

            {/* submit button */}

            <div>
              <input
                type="submit"
                value="Update"
                className="btn normal-case lg:col-span-2 text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-10 mt-4 m-auto"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateFood;
