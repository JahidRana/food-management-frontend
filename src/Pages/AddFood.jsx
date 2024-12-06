import Swal from "sweetalert2";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";
import { Helmet } from "react-helmet";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const formRef = useRef(null);

  const handleAddFood = async (e) => {
    e.preventDefault();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const image = form.get("image");
    const quantity = form.get("quantity");
    const location = form.get("location");
    const time = form.get("time");
    const notes = form.get("notes");
    const status = "available";
    const userImage = user.photoURL;
    const userName = user.displayName;
    const userEmail = user.email;

    const newFood = {
      name,
      image,
      quantity,
      location,
      time,
      notes,
      status,
      userImage,
      userName,
      userEmail,
    };
console.log(newFood);
    axios.post(`${API_BASE_URL}/foods`, newFood, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Food added successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          formRef.current.reset();
        }
      });
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Unity | Add Food</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Navbar />
      <div>
        <div className="px-4 md:px-10 lg:px-20 py-20 lg:py-40">
          <span className="text-4xl font-bold border-b-8 border-blue1 pb-2">
            Add a Food
          </span>

          {/* add food form */}

          <form
            ref={formRef}
            onSubmit={handleAddFood}
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 pt-16"
          >
            {/* food name */}

            <div className="border-b-2 border-dark2">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Food Name"
                required
                className="focus:outline-none bg-transparent w-full px-4 py-2"
              />
            </div>

            {/* food image */}
            <div className="border-b-2 border-dark2">
              <input
                type="text"
                name="image"
                id="image"
                placeholder="Food Image URL"
                required
                className="focus:outline-none bg-transparent w-full px-4 py-2"
              />
            </div>

            {/*food quantity */}

            <div className="border-b-2 border-dark2">
              <input
                type="text"
                name="quantity"
                id="quantity"
                placeholder="Food Quantity"
                required
                className="focus:outline-none bg-transparent w-full px-4 py-2"
              />
            </div>

            {/*food location */}

            <div className="border-b-2 border-dark2">
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Food Pickup Location"
                required
                className="focus:outline-none bg-transparent w-full px-4 py-2"
              />
            </div>

            {/*expired time */}

            <div className="border-b-2 border-dark2">
              <input
                type="text"
                name="time"
                id="time"
                placeholder="Expired Date or Time"
                required
                className="focus:outline-none bg-transparent w-full px-4 py-2"
              />
            </div>

            {/*notes */}

            <div className="border-b-2 border-dark2">
              <input
                type="text"
                name="notes"
                id="notes"
                required
                placeholder="Additional Notes"
                className="focus:outline-none bg-transparent w-full px-4 py-2"
              />
            </div>

            {/* submit button */}

            <div>
              <input
                type="submit"
                value="Add"
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

export default AddFood;
