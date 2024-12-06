import { AiFillStar } from "react-icons/ai";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      review:
        "Quick connections, making a real difference. I'm proud to be part of this community.",
    },
    {
      id: 2,
      review:
        "Life-changing platform. Easy connections, trustworthy, and heartwarming.",
    },
    {
      id: 3,
      review:
        "Community, convenience, and compassion. A platform that truly matters.",
    },
  ];

  return (
    <div className="px-4 md:px-10 lg:px-20 mt-10 lg:-mt-20 mb-20 lg:mb-40">
      <span className="text-4xl font-bold border-b-8 border-blue1 pb-2">
        Some Reviews
      </span>
      <div className="grid lg:grid-cols-3 justify-between items-center gap-10 mt-20 lg:mt-32">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-2 border-blue1 rounded-2xl px-4 py-10"
          >
            <p className="text-center text-lg">
              <span className="text-7xl text-blue2">❝</span>
              {review.review}
            </p>
            <p className="flex justify-center gap-1 text-star text-2xl pt-4">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
