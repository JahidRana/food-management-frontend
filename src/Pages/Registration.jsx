import Lottie from "react-lottie";
import registrationAnimation from "../assets/login.json";
import Navbar from "../Components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiLink, BiUser } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";
import Footer from "../Components/Footer";

const Registration = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: registrationAnimation,
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photo = form.get("photo");

    try {
      if (password.length < 6) {
        throw new Error("Password should be at least 6 characters");
      }

      if (!/[A-Z]/.test(password)) {
        throw new Error(
          "Password should have at least one uppercase character"
        );
      }

      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
        throw new Error("Password should have at least one special character");
      }

      const userCredential = await createUser(email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo,
      });

      Swal.fire({
        title: "Success!",
        text: "Sign Up successfully",
        icon: "success",
        confirmButtonText: "Cool",
      });

      setTimeout(() => {
        navigate(location?.state ? location.state : "/");
      }, 1000);
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Unity | Registration</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="absolute top-0 z-50 w-full">
        <Navbar />
      </div>
      <div className="flex flex-col justify-center pb-20 pt-20 md:pt-28 lg:pt-40">
        <div className="lg:grid lg:grid-cols-2 justify-center items-center gap-4 px-4 md:px-10 lg:px-32">
          {/* lottie animation */}

          <div className="flex flex-col items-center">
            <Lottie options={defaultOptions} />
            <div>
              <Link
                to="/login"
                className="text-lg font-medium text-blue1 px-12 pt-2 pb-3 underline"
              >
                Login your account
              </Link>
            </div>
          </div>
          {/* login form */}

          <div className="pt-20 lg:pt-0">
            <span className="text-4xl font-bold border-b-8 border-blue1 pb-2">
              Registration
            </span>
            <form onSubmit={handleRegistration}>
              {/* name */}

              <div className="relative border-b-2 border-dark2 mt-16 mb-10">
                <div className="absolute top-1/2 -translate-y-1/2 text-xl text-blue1">
                  <BiUser />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="focus:outline-none bg-transparent w-full pl-10 pr-4 py-2"
                />
              </div>
              {/* email */}

              <div className="relative border-b-2 border-dark2 mb-10">
                <div className="absolute top-1/2 -translate-y-1/2 text-xl text-blue1">
                  <HiOutlineMail />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="focus:outline-none bg-transparent w-full pl-10 pr-4 py-2"
                />
              </div>
              {/* password */}

              <div className="relative border-b-2 border-dark2">
                <div className="absolute top-1/2 -translate-y-1/2 text-xl text-blue1">
                  <MdPassword />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Your Password"
                  required
                  className="focus:outline-none bg-transparent w-full pl-10 pr-4 py-2"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-0 -translate-y-1/2 text-xl text-blue1 cursor-pointer"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
              {/* photo */}

              <div className="relative border-b-2 border-dark2 mt-10 mb-10">
                <div className="absolute top-1/2 -translate-y-1/2 text-xl text-blue1">
                  <BiLink />
                </div>
                <input
                  type="text"
                  name="photo"
                  placeholder="Your Photo URL"
                  required
                  className="focus:outline-none bg-transparent w-full pl-10 pr-4 py-2"
                />
              </div>
              {/* registration error */}

              <div className="text-center -mb-4">
                {registerError && (
                  <p className="text-sm text-red-600">{registerError}</p>
                )}
              </div>
              {/* submit button */}

              <input
                type="submit"
                value="Register"
                className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-10 mt-10"
              />
            </form>
          </div>
        </div>
        <div className="lg:hidden mt-10">
          <Link
            to="/login"
            className="font-medium text-blue1 underline px-4 md:px-10"
          >
            Login your account
          </Link>
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={handleBack}
            className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-10 mt-4 lg:mt-10"
          >
            Go Home
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;
