import Lottie from "react-lottie";
import about from "../assets/about.json";

const AboutUs = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: about,
  };

  return (
    <div className="lg:gap-4 px-4 md:px-10 lg:px-20 py-20 pt-10 lg:-mt-16 lg:py-40">
      <span className="text-4xl font-bold border-b-8 border-blue1 pb-2">
        About Us
      </span>
      <div className="grid lg:grid-cols-2 items-center lg:gap-10 mt-10">
        <Lottie options={defaultOptions} />
        <div className="text-lg text-justify leading-8 pt-10">
          <p className="pb-6">
            <span className="text-xl font-medium ">
              Food<span className="text-blue1"> Unity</span>
            </span>{" "}
            connects neighbors to share surplus food, reduce waste, and ensure
            no one in the community goes hungry. Join us in the movement of food
            sharing and community building.
          </p>
          <p>
            Welcome to{" "}
            <span className="text-xl font-medium ">
              Food<span className="text-blue1"> Unity</span>
            </span>
            , where sharing food fosters connections and makes a difference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
