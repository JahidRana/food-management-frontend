import { Spiral as Hamburger } from "hamburger-react";
import { useContext, useEffect, useState } from "react";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import { BiLogInCircle } from "react-icons/bi";
import logo from "../assets/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [showUserInfo, setShowUserInfo] = useState(false);
  const [toggle, setToggle] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const pages = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Available Foods",
      path: "/availableFoods",
    },
    {
      id: 3,
      name: "Add Food",
      path: "/addFood",
    },
    {
      id: 4,
      name: "Manage My Foods",
      path: "/manageMyFoods",
    },
    {
      id: 5,
      name: "My Food Request",
      path: "/myFoodRequest",
    },
  ];

  const others = [
    {
      id: 1,
      name: "Profile",
      path: "/profile",
    },
    {
      id: 2,
      name: "Dashboard",
      path: "/dashboard",
    },
  ];

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleThemeToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleUserInfoClick = () => {
    setShowUserInfo(!showUserInfo);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            title: "Success!",
            text: "Sign Out successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        });
      }
    });
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div
      style={{ color: "var(--bg-color)" }}
      className="relative grid grid-cols-3 lg:grid-cols-5 items-center bg-blue3 pl-1 pr-4 md:px-10 lg:px-20 md:py-2 lg:py-3"
    >
      {/* pages */}

      {/*for sm and md device */}

      <div className="lg:hidden">
        <Hamburger onToggle={handleToggle} rounded size={22} color="#333333" />
        {toggle ? (
          <div data-aos="fade-in" className="relative">
            <div className="absolute top-2 md:top-4 left-4 md:left-0 flex flex-col items-center rounded-xl bg-blue3 font-medium">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="hover:bg-blue2 text-center cursor-pointer duration-300 w-full"
                >
                  <NavLink
                    to={page.path}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-blue1"
                        : "text-dark1"
                    }
                  >
                    <button className="w-64 py-4">{page.name}</button>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* for lg device */}

      <div className="hidden lg:flex justify-center items-center gap-12 col-span-3 font-medium">
        {pages.map((page) => (
          <div key={page.id}>
            <NavLink
              to={page.path}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue1" : "text-dark1"
              }
            >
              {page.name}
            </NavLink>
          </div>
        ))}
      </div>
      {/* brand logo */}

      <div className="flex justify-center lg:justify-start items-center lg:order-first text-dark1">
        <span>
          <Link to="/">
            <img src={logo} className="h-10 md:h-12" />
          </Link>
        </span>
        <Link
          to="/"
          style={{ color: "var(--text-color)" }}
          className="hidden md:block text-2xl font-semibold ml-2"
        >
          Food<span className="text-blue1">Unity</span>
        </Link>
      </div>
      {/* theme and login */}

      <div className="flex items-center justify-end gap-4 lg:gap-6">
        {/* dark and light toggle */}

        <div className="bg-transparent hover:bg-transparent border-none pt-2">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={handleThemeToggle}
              checked={theme === "light" ? false : true}
            />
            <img
              src={sun}
              alt="light"
              className="w-5 h-5 md:w-6 md:h-6 swap-on"
            />
            <img
              src={moon}
              alt="dark"
              className="w-4 h-4 lg:w-5 lg:h-5 swap-off"
            />
          </label>
        </div>

        {/* login */}

        <div className="relative">
          {user ? (
            <button
              onClick={handleUserInfoClick}
              className="cursor-pointer pt-2"
            >
              <img
                src={user?.photoURL}
                alt={`${user.displayName}'s profile`}
                className="w-6 md:w-8 h-6 md:h-8 rounded-full"
              />
            </button>
          ) : (
            <Link to="/login">
              <button className="md:hidden text-xl text-blue1 pt-1">
                <BiLogInCircle />
              </button>
              <button className="hidden md:block btn normal-case text-base font-medium text-blue1 border-2 border-blue1 hover:border-blue1 bg-transparent hover:bg-transparent rounded-lg duration-300 px-6">
                Log In
              </button>
            </Link>
          )}
          {showUserInfo && user && (
            <div data-aos="fade-in" className="relative">
              <div className="absolute top-3.5 md:top-4 lg:top-5 right-4 md:right-0 flex flex-col items-center rounded-xl bg-blue3 font-medium">
                {/* user name and email */}

                <div className="border-b-2 text-dark1 border-blue1 mb-2 w-52">
                  <p className="text-center py-4">{user.displayName}</p>
                  <p className="text-center pb-4">{user.email}</p>
                </div>

                {/* profile and dashboard */}

                {others.map((other) => (
                  <div
                    key={other.id}
                    className="hover:bg-blue2 text-dark1 text-center cursor-pointer duration-300 w-full"
                  >
                    <Link to={other.path}>
                      <button className="w-60 py-4">{other.name}</button>
                    </Link>
                  </div>
                ))}

                {/* log out */}

                <button
                  onClick={handleLogout}
                  className="hover:bg-blue2 hover:rounded-b-xl text-dark1 duration-300 w-full py-4"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
