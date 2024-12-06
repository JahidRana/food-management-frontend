import Lottie from "react-lottie";
import loading from "../assets/loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
  };

  return (
    <div className="h-[600px]">
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default Loading;
