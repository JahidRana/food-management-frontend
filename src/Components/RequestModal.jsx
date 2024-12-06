import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const RequestModal = ({ food }) => {
  const { user } = useContext(AuthContext);

  const {
    _id,
    image,
    name,
    location,
    time,
    notes,
    userEmail,
    userName,
    status,
  } = food;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handleRequest = (e) => {
    e.preventDefault();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const form = new FormData(e.currentTarget);

    const requestFood = {
      name: form.get("name"),
      image: form.get("image"),
      donatorEmail: form.get("donatorEmail"),
      donatorName: form.get("donatorName"),
      userEmail: form.get("userEmail"),
      location: form.get("location"),
      time: form.get("time"),
      notes: form.get("notes"),
      requestDate: form.get("requestDate"),
      donationMoney: form.get("donationMoney"),
      status: status,
      userName: user.displayName,
      userImage: user.photoURL,
    };

    const modal = document.getElementById("modal");
    modal.close();

    axios.post(
        `${API_BASE_URL}/foodRequest`,
        requestFood,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your request has been submitted",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleRequest} className="space-y-10">
        {/* food name */}

        <div className="border-b-2 border-dark2">
          <p className="text-lg text-blue1">Food Name</p>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            readOnly
            className="focus:outline-none bg-transparent w-full px-4 py-2"
          />
        </div>

        {/* food image */}

        <div className="border-b-2 border-dark2">
          <p className="text-lg text-blue1">Food Image URL</p>
          <input
            type="text"
            name="image"
            id="image"
            value={image}
            readOnly
            className="focus:outline-none bg-transparent w-full px-4 py-2"
          />
        </div>

        {/* food id */}

        <div className="border-b-2 border-dark2">
          <p className="text-lg text-blue1">Food ID</p>
          <input
            type="text"
            name="id"
            id="id"
            value={_id}
            readOnly
            className="focus:outline-none bg-transparent w-full px-4 py-2"
          />
        </div>

        {/* donator email */}

        <div className="border-b-2 border-dark2">
          <p className="text-lg text-blue1">Donator Email</p>
          <input
            type="email"
            name="donatorEmail"
            id="donatorEmail"
            value={userEmail}
            readOnly
            className="focus:outline-none bg-transparent w-full px-4 py-2"
          />
        </div>

        {/* donator name */}

        <div className="border-b-2 border-dark2">
          <p className="text-lg text-blue1">Donator Name</p>
          <input
            type="text"
            name="donatorName"
            id="donatorName"
            value={userName}
            readOnly
            className="focus:outline-none bg-transparent w-full px-4 py-2"
          />
        </div>

        {/* user email */}

        <div className="border-b-2 border-dark2">
          <p className="text-lg text-blue1">User Email</p>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={user.email}
            readOnly
            className="focus:outline-none bg-transparent w-full px-4 py-2"
          />
        </div>

        {/* request date */}

        <div className="border-b-2 border-dark2">
          <p className="text-lg text-blue1">Request Date</p>
          <input
            type="text"
            name="requestDate"
            id="requestDate"
            value={formattedDate}
            readOnly
            className="focus:outline-none bg-transparent w-full px-4 py-2"
          />
        </div>

        {/* food location */}

        <div className="border-b-2 border-dark2">
          <p className="text-lg text-blue1">Pickup Location</p>
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            readOnly
            className="focus:outline-none bg-transparent w-full px-4 py-2"
          />
        </div>

        {/* expired time */}

        <div className="border-b-2 border-dark2">
          <p className="text-lg text-blue1">Expired Date/Time</p>
          <input
            type="text"
            name="time"
            id="time"
            value={time}
            readOnly
            className="focus:outline-none bg-transparent w-full px-4 py-2"
          />
        </div>

        {/* notes */}

        <div className="border-b-2 border-dark2">
          <p className="text-lg text-blue1">Additional Notes</p>
          <textarea
            type="text"
            name="notes"
            id="notes"
            defaultValue={notes}
            placeholder="Additional Notes"
            className="focus:outline-none bg-transparent w-full px-4 py-2"
          />
        </div>

        {/* donation money */}

        <div className="border-b-2 border-dark2">
          <p className="text-lg text-blue1">Donation Money</p>
          <input
            type="text"
            name="donationMoney"
            id="donationMoney"
            placeholder="Donation Money"
            className="focus:outline-none bg-transparent w-full px-4 py-2"
          />
        </div>

        {/* request button */}

        <div className="absolute">
          <input
            type="submit"
            value="Request"
            className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-10"
          />
        </div>
      </form>
    </div>
  );
};

export default RequestModal;
