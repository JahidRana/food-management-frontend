import Swal from "sweetalert2";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";

const CancelFood = ({ food, foods, setFoods }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { _id, name, location, time, status } = food;

  const count = foods.findIndex((item) => item._id === _id) + 1;

  const handleDeleteFood = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${API_BASE_URL}/foods/${_id}`
          )
          .then((response) => {
            if (response.data.deletedCount) {
              Swal.fire("Deleted!", "Request has been deleted.", "success");
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
      <td>{status}</td>

      {/* update action */}

      <td className="relative">
        <Link to={`/updateFood/${_id}`}>
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg rounded-full hover:bg-blue1/60 duration-300 p-3">
            <BiSolidPencil />
          </button>
        </Link>
      </td>

      {/* delete action */}

      <td className="relative">
        <button
          onClick={() => handleDeleteFood(_id)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg rounded-full hover:bg-blue1/60 duration-300 p-3"
        >
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default CancelFood;
