import Desinger from "../assets/DesignerMen.jpg";
import teamWork from "../assets/teamWork.jpg";
import womenTyping from "../assets/womenTyping.jpg";
import { Fade } from "react-awesome-reveal";
import Footer from "../components/Footer";

import Navbar from "../components/navbar";
function Services() {
  return (
    <>
      <Navbar />
      <section className="w-full px-2.5 py-10 bg-white md:mt-[50px]">
        <TitleSection />
        <h1 className="text-center font-bold text-[2rem] mb-2.5 mt-15">
          We offer quality services
        </h1>

        <div className="servicesContainer flex md:flex-nowrap flex-wrap lg:gap-25 md:gap-15 gap-10 max-w-[1300px] m-auto px-10 md:p-5">
          <Fade className="w-full" duration={2000} delay={200} triggerOnce>
            <div className=" relative">
              <img src={Desinger} alt="" className="w-full h-[450px] " />

              <div className="card-content bg-white absolute bottom-0 left-[-30px] shadow-lg p-2.5  pl-7  w-[90%]">
                <h2 className="font-bold text-[1.5rem] mb-1.5">
                  Expert Consultation
                </h2>
                <p className="text-services">
                  Our knowledgeable staff will help you choose the perfect
                  device to match your needs and budget.
                </p>
              </div>
            </div>
          </Fade>
          <Fade className="w-full" duration={2000} delay={200} triggerOnce>
            <div className=" relative">
              <img src={teamWork} alt="" className="w-full h-[450px] " />

              <div className="card-content bg-white absolute bottom-0 left-[-30px] shadow-lg p-2.5  pl-7 w-[90%]">
                <h2 className="font-bold text-[1.5rem] mb-1.5">
                  Device Repair
                </h2>
                <p className="text-services">
                  We offer professional repair services to get your devices back
                  in top condition.
                </p>
              </div>
            </div>
          </Fade>

          <Fade className="w-full" duration={2000} delay={200} triggerOnce>
            <div className=" relative">
              <img
                src={womenTyping}
                alt=""
                className="w-full h-[450px] object-cover"
              />

              <div className="card-content bg-white absolute bottom-0 left-[-30px] shadow-lg p-2.5 pl-7 w-[90%]">
                <h2 className="font-bold text-[1.5rem] mb-1.5">24/7 Support</h2>
                <p className="text-services">
                  Our dedicated support team is always available to assist you
                  with any inquiries or issues.
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </section>
      <Footer />
    </>
  );
}

export function TitleSection() {
  return (
    <>
      <div className="flex w-full items-center md:mt-[50px] ">
        <div className="border border-gray-400 w-full h-0.5"></div>
        <h1 className="title-section md:text-[1.5rem] text-[1rem] text-center text-black font-medium rounded-[30px] md:p-2.5 p-1.5 border border-gray-400  w-[500px]">
          Service section
        </h1>
        <div className="border border-gray-400 w-full h-0.5"></div>
      </div>
    </>
  );
}

export default Services;
