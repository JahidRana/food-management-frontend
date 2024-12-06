import { useEffect } from "react";
import AboutUs from "../Components/AboutUs";
import Contact from "../Components/Contact";
import Foods from "../Components/Foods";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Reviews from "../Components/Reviews";
import { Helmet } from "react-helmet";
import Sliders from "../Components/Sliders";

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(scrollToTop, []);

  return (
    <div className="relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Unity</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="absolute w-full z-50">
        <Navbar />
      </div>
      <div className="pt-12 md:pt-16">
        <Sliders />
      </div>
      <Foods />
      <AboutUs />
      <Contact />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
