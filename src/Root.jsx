import { Outlet } from "react-router-dom";
import UseScroll from "./Components/UseScroll";
import "./Scroll/scrollbar.css";

const Root = () => {
  return (
    <div>
      <div className="relative font-cabin">
        <div className="sticky top-0 z-50">
          <UseScroll />
        </div>
        <div className="-mt-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
