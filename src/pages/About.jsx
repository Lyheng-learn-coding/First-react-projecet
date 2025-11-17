import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { Fade } from "react-awesome-reveal";

function About() {
  return (
    <>
      <Navbar />
      <section className="aboutContainer  w-full h-screen relative md:px-[100px] px-3 pt-[50px] md:pt-0 ">
        <Fade duration={2000} delay={200} triggerOnce>
          <div className="md:max-w-[550px] max-w-[700px] text-white md:absolute md:top-[30%] relative ">
            <h1 className="md:text-[3rem]  text-[2.5rem] font-bold mb-[30px] ">
              Welcome to ZIZA Shop
            </h1>
            <p className="text-justify">
              At ZIZA Shop, we believe that the right technology can make a
              world of difference. That's why we've dedicated ourselves to
              curating a top-tier collection of the latest smartphones and
              laptops. We're more than just a store; we're a team of tech
              enthusiasts committed to helping you find the perfect device to
              fit your lifestyle. Explore our products and discover the ZIZA
              difference.
            </p>
          </div>
        </Fade>
      </section>
      <Footer />
    </>
  );
}
export default About;
