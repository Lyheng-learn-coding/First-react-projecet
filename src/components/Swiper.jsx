import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import DellImage from "../assets/Dell-laptop.jpg";
import PhoneGirl from "../assets/phonesGirls.jpg";
import macImage from "../assets/mac-image.jpg";
import samsungPhone from "../assets/samsung-phone.jpg";
import { Slide, Fade } from "react-awesome-reveal";

function TheSwiper() {
  return (
    <>
      <Fade duration={2000} delay={200} triggerOnce>
        <div className="SwiperContainer max-w-[1300px] m-auto md:h-[660px] h-[300px] md:mt-20">
          <Swiper
            className="w-full h-full"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
          >
            <SwiperSlide>
              <img src={macImage} alt="Slide 1" className="h-full w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={DellImage} alt="Slide 2" className="h-full w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={PhoneGirl} alt="Slide 3" className="h-full w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={samsungPhone} alt="Slide 3" className="h-full w-full" />
            </SwiperSlide>
          </Swiper>
        </div>
      </Fade>
    </>
  );
}

export default TheSwiper;
