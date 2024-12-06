import Lottie from "react-lottie";
import loginAnimation from "../assets/registration.json";
import Navbar from "../Components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { FaSquareGithub } from "react-icons/fa6";
import { ImGoogle2 } from "react-icons/im";
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import { Helmet } from "react-helmet";
import Footer from "../Components/Footer";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    login(email, password)
      .then(() => {
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1000);

        Swal.fire({
          title: "Success!",
          text: "Sign In successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
      })
      .catch((error) => {
        if (error.message === "Invalid email") {
          Swal.fire({
            title: "Error!",
            text: "Invalid email. Please check your email address",
            icon: "error",
            confirmButtonText: "Cool",
          });
        } else if (error.message === "Invalid password") {
          Swal.fire({
            title: "Error!",
            text: "Invalid password. Please check your password",
            icon: "error",
            confirmButtonText: "Cool",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Sign In failed. Please check your credentials.",
            icon: "error",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Sign Up successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1000);
        console.log(res.user);
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  // const handleGithubLogin = () => {
  //   githubLogin()
  //     .then((res) => {
  //       Swal.fire({
  //         title: "Success!",
  //         text: "Sign Up successfully",
  //         icon: "success",
  //         confirmButtonText: "Cool",
  //       });
  //       setTimeout(() => {
  //         navigate(location?.state ? location.state : "/");
  //       }, 1000);
  //       console.log(res.user);
  //     })
  //     .catch((error) => {
  //       setLoginError(error.message);
  //     });
  // };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Unity | Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="absolute top-0 z-50 w-full">
        <Navbar />
      </div>
      <div className="flex flex-col justify-center pb-20 pt-20 md:pt-28 lg:pt-40">
        <div className="lg:grid lg:grid-cols-2 justify-center items-center gap-4 px-4 md:px-10 lg:px-32">
          {/* lottie animation */}

          <div className="flex flex-col items-center z-10">
            <Lottie options={defaultOptions} />
            <div>
              <Link
                to="/registration"
                className="text-lg font-medium text-blue1 px-12 pt-2 pb-3 underline"
              >
                Create an account
              </Link>
            </div>
          </div>
          {/* login form */}

          <div className="pt-20 lg:pt-0">
            <span className="text-4xl font-bold border-b-8 border-blue1 pb-2">
              Log In
            </span>
            <form onSubmit={handleLogin}>
              {/* email */}

              <div className="relative border-b-2 border-dark2 mt-16 mb-10">
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
              {/* registration error */}

              <div className="text-center -mb-4">
                {loginError && (
                  <p className="text-sm text-red-600">{loginError}</p>
                )}
              </div>
              {/* submit button */}

              <input
                type="submit"
                value="Login"
                className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-10 mt-20"
              />
            </form>
            {/* login with google and github */}

            <div className="flex items-center gap-6 mt-10">
              <h3 className="font-semibold">Or login with</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleGoogleLogin}
                  className="text-3xl text-[#ea4335]"
                >
                  <ImGoogle2 className="rounded-md" />
                </button>
                {/* <button onClick={handleGithubLogin} className="text-[33px]">
                  <FaSquareGithub className="rounded-lg" />
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden mt-10">
          <Link
            to="/registration"
            className="font-medium text-blue1 underline px-4 md:px-10"
          >
            Create account
          </Link>
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={handleBack}
            className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent duration-300 px-10 mt-10 lg:mt-0 lg:mb-20"
          >
            Go Home
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
