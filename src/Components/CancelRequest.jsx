import Swal from "sweetalert2";
import { MdOutlineCancel } from "react-icons/md";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const CancelRequest = ({ food, foods, setFoods }) => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    _id,
    name,
    donatorName,
    location,
    time,
    requestDate,
    donationMoney,
    status,
  } = food;

  const count = foods.findIndex((item) => item._id === _id) + 1;

  const url = `/foodRequest/${_id}?email=${user?.email}`;

  const handleCancelRequest = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(url)
          .then((response) => {
            if (response.data.deletedCount) {
              Swal.fire("Canceled!", "Request has been canceled.", "success");
              const remaining = foods.filter((food) => food._id !== _id);
              setFoods(remaining);
            }
          })
          .catch((error) => {
            console.error("Error cancelling request:", error);
          });
      }
    });
  };

  return (
    <tr className="font-medium">
      <th>{count}</th>
      <td>{name}</td>
      <td>{location}</td>
      <td>{time}</td>
      <td>{donatorName}</td>
      <td>{requestDate}</td>
      <td className="text-center">${donationMoney ? donationMoney : 0}</td>
      <td>{status}</td>

      {/* delete action */}

      <td className="relative">
        <button
          onClick={() => handleCancelRequest(_id)}
          disabled={status === "delivered"}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg rounded-full hover:bg-blue1/60 duration-300 p-3"
        >
          <MdOutlineCancel />
        </button>
      </td>
    </tr>
  );
};

export default CancelRequest;
