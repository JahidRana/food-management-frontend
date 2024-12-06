import axios from "axios";
import Swal from "sweetalert2";

const ManageFood = ({ food, foods, setFoods }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { _id, userImage, userName, userEmail, requestDate, status } = food;

  const count = foods.findIndex((item) => item._id === _id) + 1;

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;

    const newStatusObj = { status: newStatus };

    console.log(newStatusObj);

    axios.put(
        `${API_BASE_URL}/foodRequest/${_id}`,
        newStatusObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.acknowledged) {
          Swal.fire({
            title: "Success!",
            text: "Product updated successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <tr className="font-medium">
      <th>{count}</th>
      <td>
        <img src={userImage} className="h-16 w-16 rounded-full mr-16" />
      </td>
      <td>{userName}</td>
      <td>{userEmail}</td>
      <td>{requestDate}</td>

      {/* update action */}

      <td>
        <select
          onChange={handleStatusChange}
          className="select border-2 border-blue1 w-full max-w-xs"
        >
          <option value="pending" disabled selected>
            {status == "available" ? "pending" : "delivered"}
          </option>
          <option value="delivered">delivered</option>
        </select>
      </td>
    </tr>
  );
};

export default ManageFood;
