import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { Fade } from "react-awesome-reveal";

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);
    const actionUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSf0-UAVec-2koYlV7JzyQYWWeSLKfaTe6AFgttnZfSRCoeNCA/formResponse";

    try {
      await fetch(actionUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors", // Important for submitting to Google Forms
      });

      Swal.fire({
        title: "Successfully Sent!",
        text: "Your message has been sent.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        draggable: true,
      });
      form.reset(); // Clear the form fields
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error sending your message. Please try again.",
        icon: "error",
        draggable: true,
      });
    }
  };

  return (
    <>
      <Navbar />

      <section className="ContactContainer h-screen relative m-auto max-w-[1600px]">
        <div className="flex justify-center items-center w-full h-full flex-col text-white">
          <Fade triggerOnce duration={2000} delay={200}>
            <h1 className="font-medium text-[2rem] max-w-[500px] text-center mb-3 p-2.5">
              Find Your Perfect Tech Companion, Delivered Free!
            </h1>
            <p className="text-[1.2rem] text-center p-2.5 max-w-prose">
              Look no further! At ZIZA Shop, we offer a wide range of the latest
              smartphones and laptops to suit your every need. Plus, we offer
              free delivery on all orders. Shop with us today and experience the
              ZIZA difference!
            </p>
          </Fade>
        </div>

        <Fade duration={1500} delay={200} triggerOnce>
          <div className="flex justify-center w-full h-full md:p-0 p-2.5">
            <div className="md:absolute md:bottom-[-360px] flex justify-center flex-col md:flex-row gap-2.5 md:gap-0 w-full max-w-[1300px]">
              <article className="contactDetail py-5 px-4  bg-[#ccc] text-black md:w-[400px] w-full leading-10">
                <h2 className="text-center font-bold text-[1.3rem] mb-3.5">
                  Contact details
                </h2>
                <div>
                  <p>
                    <strong className="mr-11">Call us:</strong>
                    <span>+855 123 456 789</span>
                  </p>
                  <p>
                    <strong className="mr-9">Location:</strong>
                    <span>Phonm Penh,Camodia</span>
                  </p>
                  <p>
                    <strong className="mr-3">Work Hours: </strong>
                    <span>Monday - Sunday 8:00 AM-8:00 PM</span>
                  </p>
                </div>
              </article>
              <article className="bg-black/80 text-white md:w-[400px] w-full py-5 px-4 ">
                <h2 className="text-center font-bold text-[1.3rem] mb-3.5">
                  Make an appointment
                </h2>
                <form
                  className="flex justify-center items-center flex-col p-3 gap-2.5"
                  onSubmit={handleSubmit}
                >
                  <div className="flex w-full gap-2.5">
                    <input
                      name="entry.1936069166"
                      type="text"
                      placeholder="Your full name"
                      required
                      className="w-full bg-black/50 p-2.5 placeholder-white focus:outline-white"
                    />
                    <input
                      name="entry.1193971683"
                      type="text"
                      placeholder="Your ph. number"
                      required
                      className="w-full bg-black/50 p-2.5 placeholder-white focus:outline-white"
                    />
                  </div>
                  <div className="w-full">
                    <input
                      name="entry.409555437"
                      type="email"
                      placeholder="Email"
                      required
                      className="w-full bg-black/50 p-2.5 placeholder-white focus:outline-white"
                    />
                  </div>
                  <div className="w-full">
                    <textarea
                      name="entry.444180435"
                      id=""
                      className="hide-scrollbar resize-none w-full bg-black/50 p-2.5 h-[150px] placeholder-white focus:outline-white"
                      placeholder="Message "
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="p-2.5 text-[blue] w-full bg-white text-[1rem] hover:bg-black hover:text-white duration-300 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </form>
              </article>
              <article className="text-black py-5 px-4  bg-[#ccc] md:w-[400px] w-full  ">
                <h2 className="text-center font-bold text-[1.3rem] mb-3.5">
                  Maintence service
                </h2>
                <p className="text-justify ">
                  Our expert technicians are here to help with all your device
                  maintenance needs. From screen repairs to software
                  troubleshooting, we'll get your phone or laptop back in top
                  condition. Contact us to schedule a service appointment.
                </p>
              </article>
            </div>
          </div>
        </Fade>
        <Footer class1="md:hidden" class2="block" class3="mt-[50px]" />
      </section>

      <section className="bg-white w-full h-[50vh] hidden md:block"></section>
      <Footer class1="hidden" class2="md:block" class3="mt-[50px]" />
    </>
  );
}

export default Contact;
