import Lottie from "react-lottie";
import errorAnimation from "../assets/error.json";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Error = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: errorAnimation,
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Unity | Error</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="flex flex-col items-center h-screen pb-32 lg:pb-40">
        <Lottie options={defaultOptions} />
        <Link
          to="/"
          className="btn normal-case text-lg text-[#63b9a5] border-2 border-[#63b9a5] hover:border-[#63b9a5] bg-transparent hover:bg-transparent duration-300 px-6"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
