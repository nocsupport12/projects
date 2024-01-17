import { AnimatedPage } from "../../components/FramerMotion/AnimatedPage";
import Bicol1 from "../../assets/about-img/about.png";
import Journey from "../../assets/about-img/journey.jpg";
import AboutLogo from "../../assets/about-img/aboutlogo.png";

// IMPORT IMAGES
import Picca from "../../assets/sponsor-img/picca.png";
import Bobsi from "../../assets/sponsor-img/bobsi.avif";

export const About = () => {
  return (
    <AnimatedPage>
      <>
        <section className="px-5 sm:px-10 2xl:px-20 font-poppins">
          <div
            className="lg:mx-32 md:mx-20 mx-10 mt-40"
            data-aos="fade-up"
            data-aos-easing="ease-in-out"
            data-aos-duration="500"
          >
            <img src={Bicol1} alt="Bicol1" className="w-full" />
          </div>
          <div className="container lg:pt-40  mx-auto py-8 px-10">
            <p
              className="my-6 text-[1rem] pb-5 text-justify lg:text-xl"
              data-aos="fade-up"
              data-aos-easing="ease-in-out"
              data-aos-duration="500"
            >
              Welcome to <span className="font-bold">Bicol One Community</span>,
              where compassion drives our commitment to alleviate poverty and
              transform lives in underprivileged communities around the world.
            </p>
            <p
              className="my-6 text-[1rem] pb-5 text-justify lg:text-xl"
              data-aos="fade-up"
              data-aos-easing="ease-in-out"
              data-aos-duration="500"
            >
              Bicol One Community is an organization operating in the Bicol
              region of the Philippines, with a mission to combat poverty and
              uplift less fortunate communities. Their approach revolves around
              empowerment, sustainability, solidarity, and advocacy. They offer
              support sustainable initiatives, foster community solidarity, and
              advocate for the marginalized. Through these efforts, they aim to
              break the cycle of poverty and provide lasting change, acting as a
              beacon of hope for the region by uniting the community in their
              mission to create a brighter, more equitable future.
            </p>

            <h2
              className="my-4 text-[2rem]  text-center font-bold md:text-5xl"
              data-aos="fade-up"
              data-aos-easing="ease-in-out"
              data-aos-duration="500"
            >
              Our Journey
            </h2>
            <div className="flex justify-center flex-col lg:flex-row items-center gap-10 mt-10">
              <img
                src={Journey}
                alt="Journey"
                className="w-[80%] md:w-[80%] lg:w-[35%] rounded-3xl"
                data-aos="zoom-in"
                data-aos-easing="ease-in"
                data-aos-duration="500"
              />
              <div>
                <p
                  className="my-4 leading-loose text-justify lg:text-xl"
                  data-aos="fade-up"
                  data-aos-easing="ease-in"
                  data-aos-duration="500"
                >
                  Founded in 2018, Bicol 1 Community began with a mission to
                  combat poverty. Initially, a small group distributed food and
                  clothing to the needy. Over time, it has transformed into a
                  global force dedicated to providing comprehensive support to
                  vulnerable communities. This journey reflects their unwavering
                  commitment to breaking the cycle of poverty. From humble
                  beginnings, Bicol 1 Community has become a beacon of hope on a
                  worldwide scale, illustrating the profound impact that
                  collective efforts can have in improving the lives of
                  countless individuals and communities.
                </p>
              </div>
            </div>
            <h2
              className="text-[2rem] font-bold my-4 text-center mt-16 md:text-5xl"
              data-aos="fade-up"
              data-aos-easing="ease-in"
              data-aos-duration="500"
            >
              Who We Are
            </h2>
            <div className="flex justify-center flex-col lg:flex-row items-center gap-10 mt-10">
              <div className="px-5 order-2 lg:order-1">
                <h3
                  className="text-3xl font-bold"
                  data-aos="fade-up"
                  data-aos-easing="ease-in"
                  data-aos-duration="500"
                >
                  Mission
                </h3>
                <p
                  className=" my-4 leading-loose text-justify lg:text-2xl"
                  data-aos="fade-up"
                  data-aos-easing="ease-in"
                  data-aos-duration="500"
                >
                  To empower individuals and communities to break free from
                  poverty by providing essential resources and opportunities for
                  sustainable growth.
                </p>
                <h3
                  className="text-3xl font-bold"
                  data-aos="fade-up"
                  data-aos-easing="ease-in"
                  data-aos-duration="500"
                >
                  Vision
                </h3>
                <p
                  className="my-4 leading-loose text-justify lg:text-2xl"
                  data-aos="fade-up"
                  data-aos-easing="ease-in"
                  data-aos-duration="500"
                >
                  A world where every person, regardless of their circumstances,
                  has the chance to lead a dignified and fulfilled life.
                </p>
              </div>
              <div
                className="text-purewhite border-4 overflow-hidden rounded-full order-1 lg:order-2  lg:w-full"
                data-aos="fade-up"
                data-aos-easing="ease-in"
                data-aos-duration="500"
              >
                <img
                  src={AboutLogo}
                  alt="AboutLogo"
                  className="rounded-3xl sm:h-[300px] md:h-[400px] lg:h-full md:w-full p-20"
                />
              </div>
            </div>
            <h2
              className="text-2xl font-bold my-4"
              data-aos="fade-up"
              data-aos-easing="ease-in"
              data-aos-duration="500"
            >
              Transparency and Accountability
            </h2>
            <p
              className="my-4"
              data-aos="fade-up"
              data-aos-easing="ease-in"
              data-aos-duration="500"
            >
              We operate with complete transparency. Our financial records are
              accessible <a href="#">here</a>, and we welcome your inquiries,
              suggestions, and feedback. We are proud to maintain the highest
              rating from the Charity Accountability Council.
            </p>

            <h2
              className="text-2xl font-bold my-4"
              data-aos="fade-up"
              data-aos-easing="ease-in"
              data-aos-duration="500"
            >
              Be One Of Us
            </h2>
            <p
              className="my-4"
              data-aos="fade-up"
              data-aos-easing="ease-in"
              data-aos-duration="500"
            >
              Ready to make a difference? Join us in the mission to end poverty
              and create a world where every person has the opportunity to
              thrive. Subscribe to our newsletter and follow us on social media
              to stay updated on our latest initiatives and events.
            </p>
          </div>
        </section>
        {/* SPONSOR SECTION */}
        <section
          id="sponsors"
          className="font-poppins pt-10 pb-10 px-5 md:px-5 lg:px-0"
        >
          <div className="container mx-auto">
            <h2 className="text-center text-4xl font-semibold 2xl:text-4xl">
              SPONSORS
            </h2>
            <div className="grid grid-cols-4 py-10 my-5 px-5 border-2  lg:grid-cols-12">
              <div className="col-span-4 lg:col-span-4 flex justify-center items-center">
                <img src={Picca} alt="PICCA" className="w-full" />
              </div>
              <div className="col-span-4 lg:col-span-8 px-5 py-5">
                <p>
                  <span className="font-bold">
                    Philippine Internet Consumers Community Association (PICCA)
                  </span>{" "}
                  is an incorporated non-for-profit organization governed by an
                  extensive set of bylaws that outline the purpose, nature and
                  organisational structure of the Association. From time to time
                  PICCA also commits to statements and policies that guide the
                  operations of the Association and its executive. These
                  materials appear below.
                </p>
                <div className="mt-5">
                  <a
                    href="http://picca.com.ph/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-primary underline hover:cursor-pointer text-sm py-5">
                      http://picca.com.ph/
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 py-10 my-5 px-5 border-2  lg:grid-cols-12">
              <div className="col-span-4 lg:col-span-4 flex justify-center items-center">
                <img src={Bobsi} alt="BOBSI" className="w-full" />
              </div>
              <div className="col-span-4 lg:col-span-8 px-5 py-5">
                <p>
                  <span className="font-bold">
                    Bicol One Broadband Services Inc. (BOBSI)
                  </span>{" "}
                  began as a telecom contractor till the Founding Charman & CEO,
                  Mr. Edwin Ferreras. With his experience across the
                  Telecommunication, Engineering, Information Technology, Market
                  Research and Business Consulting sectors since 2012, they have
                  identified an opportunity for a small organization to
                  reengineer and disrupt how internet is being delivered and
                  serviced in the Philippines. Bicol One Broadband Services Inc.
                  (BOBSI) is a licensed internet service provider by the
                  National Telecommunication Commission (NTC) serving more than
                  thousands of internet users in Bulacan, Metro Manila, Rizal,
                  Cavite, Laguna, Quezon Province, and Bicol Region.
                </p>
                <div className="mt-5">
                  <a
                    href="https://bicol1.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-primary underline hover:cursor-pointer text-sm py-5">
                      https://bicol1.com/
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </AnimatedPage>
  );
};
