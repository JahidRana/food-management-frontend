import { Link } from "react-router-dom";
import { BsGoogle, BsInstagram, BsDiscord } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";

const icons = [
  {
    id: 1,
    icon: BsGoogle,
    color: "#ea4335",
  },
  {
    id: 2,
    icon: BsInstagram,
    color: "#ff69b4",
  },
  {
    id: 3,
    icon: BsDiscord,
    color: "#7289da",
  },
  {
    id: 4,
    icon: FaFacebookF,
    color: "#1877f2",
  },
  {
    id: 5,
    icon: FaLinkedinIn,
    color: "#0077b5",
  },
  {
    id: 6,
    icon: FaXTwitter,
    color: "#000000",
  },
];

const Footer = () => {
  return (
    <footer>
      <div className="grid lg:grid-cols-4 items-center lg:items-start gap-16 lg:gap-0 bg-blue3 px-4 md:px-10 lg:px-20 py-20 lg:pt-32 lg:pb-20">
        <div className="flex flex-col items-center lg:items-start text-dark1">
          <span>
            <Link to="/">
              <img src={logo} className="h-16 md:h-20 mb-2" />
            </Link>
          </span>
          <Link to="/" className="text-3xl lg:text-5xl font-bold">
            Food<span className="t text-blue1">Unity</span>
          </Link>
          <p className="text-lg text-center lg:text-start pt-3">
            Connecting Communities, Reducing Waste
          </p>
        </div>
        <div className="flex flex-col items-center text-center lg:text-start gap-6 text-dark1 font-medium">
          <h3 className="text-xl font-semibold text-dark1 -ml-6">
            Useful Links
          </h3>
          <div className="flex flex-col gap-4">
            <span className="hover:text-blue1 duration-300">
              <Link to="/availableFoods">Available Foods</Link>
            </span>
            <span className="hover:text-blue1 duration-300">
              <Link to="/addFood">Add Food</Link>
            </span>
            <span className="hover:text-blue1 duration-300">
              <Link to="/manageMyFoods">Manage My Foods</Link>
            </span>
            <span className="hover:text-blue1 duration-300">
              <Link to="/myFoodRequest">My Food Request</Link>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center text-center lg:text-start gap-6 text-dark1 font-medium">
          <h3 className="text-xl font-semibold text-dark1">
            Contact Information
          </h3>
          <div className="flex flex-col gap-4">
            <p>foodunity@gmail.com</p>
            <p>Phone: +88 01739-601888</p>
            <p>Fax: +1 (555) 986-4521</p>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="flex flex-col text-center lg:text-start gap-6 text-dark1 font-medium">
            <h3 className="text-xl font-semibold text-dark1">Address</h3>
            <p>
              JUST, Churamonkathi, Jashore,
              <br />
              Bangladesh
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-8 lg:col-span-4 text-xl md:text-2xl lg:text-3xl lg:mt-24">
          {icons.map((icon) => (
            <Link key={icon.id}>{icon.icon({ color: icon.color })}</Link>
          ))}
        </div>
      </div>
      <div className="text-xs font-medium text-center text-[#3c3c3c] bg-blue2 py-1.5">
        Copyright©2024 - All right reserved by  Jahid Rana
      </div>
    </footer>
  );
};

export default Footer;
