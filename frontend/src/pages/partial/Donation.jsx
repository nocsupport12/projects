
import { Link } from "react-router-dom";

// IMPORT FRAMER MOTION
import { AnimatedPage } from "../../components/FramerMotion/AnimatedPage";

// IMPORT IMAGE
import QR from "../../assets/donation-img/qrcode.jpg";
import Bdo from "../../assets/donation-img/bdo.jpg";
import Bpi from "../../assets/donation-img/bpi.webp";
import Chinabank from "../../assets/donation-img/chinabank.jpeg";
import Gcash from "../../assets/donation-img/gcash.png";
import Landbank from "../../assets/donation-img/landbank.jpg";
import Metrobank from "../../assets/donation-img/metrobank.webp";
import Paymaya from "../../assets/donation-img/paymaya.webp";
import Pnb from "../../assets/donation-img/pnb.png";
import Securitybank from "../../assets/donation-img/securitybank.jpg";
import Unionbank from "../../assets/donation-img/unionbank.jpg";
import EmailForm from "../../components/Emailjs/EmailForm";

export const Donation = () => {
  return (
    <AnimatedPage>
      <>
        <section className="font-poppins pt-40 px-5 md:px-5 lg:px-0 ">
          <div className="container mx-auto">
          <h2 className="text-center text-4xl font-semibold 2xl:text-4xl">
          DONATION
        </h2>
        <p className="text-center text-2xl font-semibold 2xl:text-4xl">
          Be One of us!
        </p>
            <div className="grid grid-cols-4 lg:grid-cols-12 gap-5">
              <div
                className="col-span-4 sm:col-span-4 md:col-span-4 p-5 bg-primary rounded-3xl"
                data-aos="fade-up"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <div className="h-[80px] flex justify-center">
                  <img
                    src={Gcash}
                    alt=""
                    className="h-full rounded-3xl border-2 border-white"
                  />
                </div>
                <div className="p-7 mt-5">
                  <img
                    src={QR}
                    alt="QR"
                    className="w-full h-full rounded-3xl object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center col-span-4 lg:col-span-8 lg:px-10">
                <h2
                  className="text-[1rem] text-center font-semibold pb-5 md:text-[1.2rem]  2xl:text-[1.5rem]"
                  data-aos="fade-up"
                  data-aos-easing="ease-in-out"
                  data-aos-duration="1000"
                >
                  Other Bank Options:
                </h2>
                <div>
                  <div className="py-16 flex flex-wrap justify-center items-center gap-5" data-aos="zoom-in" data-aos-easing="ease-in-out" data-aos-duration="1000">
                    <div className="h-[80px]">
                      <img src={Bdo} alt="" className="h-full rounded-3xl" />
                    </div>
                    <div className="h-[80px]">
                      <img src={Bpi} alt="" className="h-full rounded-3xl" />
                    </div>
                    <div className="h-[80px]">
                      <img
                        src={Chinabank}
                        alt=""
                        className="h-full rounded-3xl"
                      />
                    </div>
                    <div className="h-[80px]">
                      <img
                        src={Landbank}
                        alt=""
                        className="h-full rounded-3xl"
                      />
                    </div>
                    <div className="h-[80px]">
                      <img
                        src={Metrobank}
                        alt=""
                        className="h-full rounded-3xl"
                      />
                    </div>
                    <div className="h-[80px]">
                      <img src={Pnb} alt="" className="h-full" />
                    </div>
                    <div className="h-[80px]">
                      <img
                        src={Securitybank}
                        alt=""
                        className="h-full rounded-3xl"
                      />
                    </div>
                    <div className="h-[80px]">
                      <img
                        src={Unionbank}
                        alt=""
                        className="h-full rounded-3xl"
                      />
                    </div>
                    <div className="h-[80px]">
                      <img
                        src={Paymaya}
                        alt=""
                        className="h-full rounded-3xl"
                      />
                    </div>
                  </div>
                  <p
                    className="text-[.8rem] text-center md:text-[1rem] 2xl:text-[1.2rem]"
                    data-aos="fade-up"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="1000"
                  >
                    Thank you for the support!
                  </p>

                  <div
                    className="flex justify-end gap-5 py-5 px-5"
                    data-aos="fade-up"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="1000"
                  >
                    <Link to="/" onClick={()=> window.scrollTo(0, 0)}><button className="btn">Go back to home </button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      <section id="contact" className="mt-16 py-10 bg-slate-500">
        <EmailForm />
      </section>
      </>
    </AnimatedPage>
  );
};
