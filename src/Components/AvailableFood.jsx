import { Link } from "react-router-dom";

const AvailableFood = ({ food }) => {
  const {
    _id,
    image,
    name,
    quantity,
    location,
    time,
    notes,
    userImage,
    userName,
  } = food;

  return (
    <div>
      <img src={image} className="rounded-t-xl" />
      <div className="bg-blue2 rounded-b-xl p-5">
        <div className="text-dark1">
          <h3 className="text-2xl font-semibold pb-4">{name}</h3>
          <div className="flex flex-col gap-3 text-blue1">
            <p>
              Quantity:
              <span className="text-dark2 pl-2">{quantity}</span>
            </p>
            <p>
              Pickup Location:
              <span className="text-dark2 pl-2 text-sm">{location}</span>
            </p>
            <p>
              Expired Date/Time:
              <span className="text-dark2 pl-2">{time}</span>
            </p>
            <p>
              Additional Notes:
              <span className="text-dark2 text-sm pl-2">{notes}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center border-t-2 border-blue1 pt-5 mt-4">
          <div className="flex items-center gap-2 w-1/2">
            <img src={userImage} className="h-10 w-10 rounded-full" />
            <p className="text-dark1">{userName}</p>
          </div>
          <Link to={`/food/${_id}`}>
            <button className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-6">
              View Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AvailableFood;
