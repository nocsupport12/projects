
import { NavLink,Link } from "react-router-dom";

// IMPORT FRAMER MOTION
import { AnimatedPage } from "../../components/FramerMotion/AnimatedPage";

// IMPORT CSS
import "../css/home.css";

// import images
import WhoWeAre from "../../assets/home-img/who-we-are.jpg";
import Activities from "../../assets/home-img/activities.jpg";
import Posts from "../../assets/home-img/posts.jpg";

// SPONSOR IMAGE
import Sponsor1 from "../../assets/sponsor-img/bobsi.avif";
import Sponsor2 from "../../assets/sponsor-img/picca.png"

import EmailForm from "../../components/Emailjs/EmailForm";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const Home = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1025 },
      items: 2,
    
    },
    tablet: {
      breakpoint: { max: 1024, min: 769 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 641 },
      items: 1,
    },
    mobileBelow: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  }

  const transition = () => {
    setTimeout(()=>{
    window.scrollTo(0, 0)  
    },500)
  }
  return (
    <AnimatedPage>
    <>
      {/* HERO SECTION */}
      <section id="hero-section" className="font-poppints">
        
        <div className="container mx-auto px-3">
          <div className=" flex flex-col gap-10 items-center justify-center flex-wrap h-screen z-10 px-3">
            <h2 className="text-[2rem] font-semibold font-poppins text-center border capitalize px-2 py-2 md:text-[4rem] 2xl:text-4xl" data-aos="zoom-in" data-aos-easing="ease-in-out" data-aos-duration="600">
              BICOL ONE COMMUNITY
            </h2>
            <h2 className="text-[4rem] sm:text-[4rem] md:text-[5rem] text-center font-dancing 2xl:text-[6rem]" data-aos="zoom-in" data-aos-easing="ease-in-out" data-aos-duration="500">
              Be One of us
            </h2>
          
          </div>
        </div>
      </section>
      {/* WHO ARE WE SECTION */}
      <section className="font-poppins pt-20 px-5 md:px-5 lg:px-10 ">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 lg:grid-cols-12 gap-5">
            <div className="col-span-4 sm:col-span-4 md:col-span-6" data-aos="zoom-in" data-aos-easing="ease-in-out" data-aos-duration="500">
              <img
                src={WhoWeAre}
                alt="Community"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between col-span-4 lg:col-span-6 lg:px-10">
              <h2 className="text-4xl pb-5  font-semibold 2xl:text-4xl" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
                Who we are?
              </h2>
              <div>
                <p className="text-[.8rem] md:text-[1rem] 2xl:text-[1.2rem] pb-10" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
                  Bicol One Community is an organization operating in the Bicol
                  region of the Philippines, with a mission to combat poverty
                  and uplift less fortunate communities. Their approach revolves
                  around empowerment, sustainability, solidarity, and advocacy.
                  They offer support sustainable initiatives, foster community
                  solidarity, and advocate for the marginalized. Through these
                  efforts, they aim to break the cycle of poverty and provide
                  lasting change, acting as a beacon of hope for the region by
                  uniting the community in their mission to create a brighter,
                  more equitable future.
                </p>
                <p className="text-[.8rem] md:text-[1rem] 2xl:text-[1.2rem]" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
                  Bicol One Community is dedicated to eliminating poverty in the
                  Bicol region by empowering communities through educational
                  opportunities, increased internet accessibility, sustainable
                  projects, and advocating for marginalized groups. Our ultimate
                  goal is to instigate lasting transformation, nurturing hope
                  and fostering a more equitable future for the entire region
                  and hopefully accross the country.
                </p>
              </div>
                <div className="text-right py-5 px-5 " data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
                  <Link to="about" onClick={transition}><button className="btn">See more</button></Link>
                </div>
            </div>
          </div>
        </div>
      </section>
      {/* ACTIVITIES SECTION */}
      <section className="font-poppins lg:pt-10 px-5 md:px-5 lg:px-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 lg:grid-cols-12 gap-5 ">
            <div className="flex flex-col justify-between col-span-4 order-2 lg:order-1 lg:col-span-6 lg:px-10">
              <h2 className="text-4xl pb-5 font-semibold 2xl:text-4xl" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
              Helping Hand Activities
              </h2>
              <div>
                <p className="text-[.8rem] md:text-[1rem] 2xl:text-[1.2rem] pb-10" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">Our mission is to provide underserved individuals with essential resources and opportunities. This initiative aims to bridge the gap in access by making crucial resources available to those who might otherwise be excluded from various opportunities. By supplying individuals with the necessary tools and support, this program not only offers a means for personal growth and development but also opens doors to greater socio-economic inclusion, enabling them to participate more fully in various aspects of life.
                </p>
              </div>
                <div className="text-right py-5 px-5 " data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
                  <Link to="/news" onClick={transition}><button className="btn">See more</button></Link>
                </div>
            </div>
            <div className="col-span-4  md:col-span-6 order-1 lg:order-2 max-h-[300px] lg:max-h-[500px]" data-aos="zoom-in"data-aos-easing="ease-in-out" data-aos-duration="500">
              <img
                src={Activities}
                alt="Charity"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* POSTS */}
      <section className="font-poppins pt-20 px-5 md:px-5 lg:px-0 ">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 lg:grid-cols-12 gap-5">
            <div className="col-span-4 sm:col-span-4 md:col-span-6" data-aos="zoom-in" data-aos-easing="ease-in-out" data-aos-duration="500">
              <img
                src={Posts}
                alt="Posts"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between col-span-4 lg:col-span-6 lg:px-10">
              <h2 className="text-4xl pb-5 font-semibold 2xl:text-4xl" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
                Poverty Across Bicol Region
              </h2>
              <div>
                <p className="text-[.8rem] md:text-[1rem] 2xl:text-[1.2rem] pb-10" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">Poverty across the Bicol Region in the Philippines remains a pressing and multifaceted issue. Despite the region's natural beauty and resources, a significant portion of its population continues to grapple with economic hardship. Factors contributing to poverty include limited access to quality education, healthcare, and employment opportunities, especially in rural areas. Vulnerability to natural disasters, particularly typhoons and volcanic eruptions, has further exacerbated the challenges faced by the region's residents. Addressing poverty in Bicol involves a holistic approach, encompassing economic development, social services, infrastructure improvements, and disaster resilience initiatives, aimed at providing residents with the means to break the cycle of poverty and build a more secure and prosperous future.
                </p>
              </div>
                <div className="flex justify-end gap-5 py-5 px-5" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
                  <Link to="/donation" onClick={transition}><button className="btn">Donate</button></Link>
                  <Link to="/news" onClick={transition}><button className="btn" >See more</button></Link>
                </div>
            </div>
          </div>
        </div>
      </section>
      {/* PROVINCE SHOWCASE SECTION */}
      <section
        id="province"
        className="font-poppins mt-10 px-5 md:px-5 lg:px-0"
      >
        <div className="container h-full mx-auto">
          <div className="grid h-full grid-cols-4 lg:grid-cols-12 gap-5 ">
            <div className="flex h-full text-center flex-col justify-center items-center col-span-12 order-2 lg:px-10">
              <h2 className="text-[2rem] font-semibold pb-5 md:text-4xl 2xl:text-5xl">
                Bicol Region
              </h2>
              <div id="sub-text">
                <p className="text-[.8rem] md:text-[1rem] 2xl:text-[1.2rem] pb-10">
                  The Bicol Region, commonly shortened to Bicol and designated
                  as Region V, is an administrative region of the Philippines.
                  Also referred to as Bicolandia, it comprises six provinces,
                  four on the Bicol Peninsula (the southeastern end of Luzon)
                  which Albay, Camarines Norte, Camarines Sur, and Sorsogon, and
                  two off the shore: Catanduanes and Masbate. The regional
                  center is Legazpi and has one independent component city, the
                  pilgrim city of Naga. The region is bounded by Lamon Bay to
                  the north, the Philippine Sea to the east, and the Sibuyan Sea
                  and Ragay Gulf to the west. The northernmost provinces,
                  Camarines Norte and Camarines Sur, are bordered to the west by
                  the province of Quezon in the Calabarzon region.
                </p>
                <div className="text-center py-5 px-5">
                  <Link to="bicol" onClick={transition}><button className="btn">See Provinces</button></Link>
                </div>
              </div>
            </div>
            {/* <div className="col-span-4  md:col-span-6 order-1 lg:order-2">
              <img src={Provinces} alt="Provinces" className="w-full h-full object-cover"/>
            </div> */}
          </div>
        </div>
      </section>
      {/* Sponsors */}
      <section id="events" className="font-poppins flex items-center justify-center py-10">
        <div className="container mx-auto px-3 sm:px-10 2xl:px-0">
          <h2 className="text-primary font-bold text-center lg:text-5xl pb-20" data-aos="zoom-in" data-aos-easing="ease-in-out" data-aos-duration="500">SPONSORS</h2>
          <Carousel 
          responsive={responsive}
          autoPlay={true}
          infinite={true}
          removeArrowOnDeviceType={['tablet', 'mobile','desktop']}
          autoPlaySpeed={2000}
          draggable={true}
          swipeable={true}
          stopOnHover={true}
          >
            
          {/* 1st image */}
            <div className="text-center sm:mx-5 2xl:mx-3">
              <img src={Sponsor1} alt="Showtime" className="h-28 mx-auto"/>
              <Link to="/sponsors" onClick={transition}><p className="text-primary text-2xl font-poppins font-bold py-3 dark:bg-darkModeGray">BOBSI</p></Link>
            </div>
            {/* 2nd image */}
            <div className="text-center sm:mx-5 2xl:mx-3">
              <img src={Sponsor2} alt="Group of Band" className="h-28 mx-auto"/>
              <Link to="/sponsors" onClick={transition}><p className="text-primary text-2xl font-poppins font-bold py-3 dark:bg-darkModeGray">PICCA</p></Link>
            </div>
            {/* 3rd image */}
            {/* <div className="text-center bg-white sm:mx-5 2xl:mx-3">
              <img src={Sponsor} alt="2 photos of dave" />
              <p className="text-primary text-2xl font-poppins font-bold pt-5 dark:bg-darkModeGray">SPONSOR 3</p>
            </div> */}
            {/* 4th image */}
            {/* <div className="text-center bg-white sm:mx-5 2xl:mx-3">
              <img src={Sponsor} alt="2 photos of dave" />
              <p className="text-primary text-2xl font-poppins font-bold pt-5 dark:bg-darkModeGray">SPONSOR 4</p>
            </div> */}
            {/* 5th image */}
            {/* <div className="text-center bg-white sm:mx-5 2xl:mx-3">
              <img src={Sponsor} alt="2 photos of dave" />
              <p className="text-primary text-2xl font-poppins font-bold pt-5 dark:bg-darkModeGray">SPONSOR 5</p>
            </div> */}
            {/* 6th image */}
            {/* <div className="text-center bg-white sm:mx-5 2xl:mx-3">
              <img src={Sponsor} alt="2 photos of dave" />
              <p className="text-primary text-2xl font-poppins font-bold pt-5 dark:bg-darkModeGray">SPONSOR 6</p>
            </div> */}
          </Carousel>
        </div> 
      </section>
      {/* DONATION SECTION */}
      <section
        id="donation"
        className="font-poppins px-5 md:px-5 lg:px-0"
      >
        <div className="container h-full mx-auto">
          <div className="grid h-full grid-cols-4 lg:grid-cols-12 gap-5 ">
            <div className="flex h-full flex-col justify-center items-center col-span-12 order-2 lg:px-10 py-5">
              <div id="contact" className="container mx-auto">
                <div className="grid grid-cols-4 lg:grid-cols-12 gap-5">
                  <div className="col-span-4 sm:col-span-4 md:col-span-6" data-aos="flip-left" data-aos-easing="ease-in-out" data-aos-duration="500"> <EmailForm />
                  </div>
                  <div
                    id="sub-text"
                    className="flex flex-col justify-center col-span-4 lg:col-span-6 lg:px-10"
                  >
                    <h2 className="text-[2rem] font-semibold pb-5 md:text-4xl mt-10  2xl:text-5xl">
                      Be With Us
                    </h2>
                    <div>
                      <p className="text-[.8rem] md:text-[1rem] 2xl:text-[1.2rem] pb-10">
                        Your support can change lives and make a lasting impact.
                        By contributing to our cause, you are helping us achieve
                        our mission and create a better world. Every donation,
                        no matter how small, brings us one step closer to our
                        goals.
                      </p>
                      <p className="text-2xl font-bold">Why Donate?</p>
                      <ul className="">
                        <li className="my-2">
                          <span className="font-bold"> Empower Change:</span>{" "}
                          Your donation helps us bring about positive change in
                          the community.
                        </li>
                        <li className="my-2">
                          <span className="font-bold">Support a Cause:</span>{" "}
                          Choose the cause that resonates with you, whether it's
                          education, healthcare, or environmental conservation.
                        </li>
                        <li className="my-2">
                          <span className="font-bold">Make an Impact:</span>{" "}
                          Every dollar you give directly contributes to our
                          projects and programs.
                        </li>
                      </ul>
                      <p className="my-2">Thank You for Your Support</p>
                      <p className="my-2">
                        We are grateful for your generosity. Your donation is an
                        investment in a brighter future. Thank you for being a
                        part of our mission.
                      </p>
                    </div>
                    <div className="flex justify-end gap-5 py-5 px-5 ">
                      <NavLink to="/donation"><button className="btn" onClick={transition}>Donate</button></NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
    </AnimatedPage>
  );
};
