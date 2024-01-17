import { Link, useParams } from "react-router-dom";

// IMPORT JS FORMAT
import { ProvinceData } from "../../components/JSFormat/ProvinceData";

// IMPORT FRAMER MOTION
import { AnimatedPage } from "../../components/FramerMotion/AnimatedPage";

// components
import { Image } from "./Image";
// css
import "../css/municipality-about.css";
import { useState } from "react";

export const MunicipalityAbout = (userDetails) => {
  
  const [active, setActive] = useState("Home")
  // const municipalityDetails =  municipalityDetails.find((barangay)=>barangay.name===window.location.pathname.split('/')[2])
  
  const { province, municipality } = useParams();
  // console.log(province, municipality)
  const MunicipalityData = ProvinceData.find((el) => el.link === province);
  console.log(MunicipalityData);

  const handleActive = (active) => {
    setActive(active)
    window.scrollTo(0, 0)
  }


  if (MunicipalityData) { 
    let municipalityDetails = ProvinceData.find(
      (el) => el.link === province
    ).municipalityList.find((el) => el.url === "/" + municipality);

    if (municipalityDetails) {
      municipalityDetails = municipalityDetails.municipalityList[0];

      return (
        <AnimatedPage>
          <>
            <section className="font-poppins bg-semidimLight py-[4.5rem] dark:bg-darkModeBlack">
              <div className="bg-green w-full px-5 py-20 text-center">
                <h2 className="text-3xl sm:text-5xl font-bold text-center py-2 dark:text-black uppercase">
                  WELCOME TO {municipalityDetails.title}
                </h2>
              </div>
              <div className="container mx-auto ">
                <div className="grid grid-cols-4 lg:grid-cols-12 lg:gap-5 pt-10 px-3 ">

                  {/* BUTTONS */}
                  <div className="bg-purewhite border rounded-lg py-5 flex flex-wrap  justify-around gap-3 px-3 col-span-4 top-20 h-max dark:bg-darkModeGray lg:flex-col lg:px-5 lg:sticky lg:col-span-3  2xl:px-10">
                    <button
                      onClick={()=> handleActive("Home")}
                      className={`text-[.8rem] sm:text-[1rem] px-2 py-2 rounded-lg flex justify-center items-center hover:bg-primary hover:text-white border border-primary w-[48%] sm:w-[31%] lg:w-[100%] ${active === "Home" ? "bg-primary text-white" : ""}`}
                    >
                      <span className="pr-2">
                        <i className="fa-solid fa-house"></i>
                      </span>
                      Home
                    </button>
                    <button
                      onClick={()=> handleActive("About")}
                      className={`text-[.8rem] sm:text-[1rem] px-2 py-2 rounded-lg flex justify-center items-center hover:bg-primary hover:text-white border border-primary w-[48%] sm:w-[31%] lg:w-[100%] ${active === "About" ? "bg-primary text-white" : ""}`}
                    >
                      <span className="pr-2">
                        <i className="fa-solid fa-circle-info"></i>
                      </span>
                      About
                    </button>
                    <button
                       onClick={()=> handleActive("Barangay")}
                      className={`text-[.8rem] sm:text-[1rem] px-2 py-2 rounded-lg flex justify-center items-center hover:bg-primary hover:text-white border border-primary w-[48%] sm:w-[31%] lg:w-[100%] ${active === "Barangay" ? "bg-primary text-white" : ""}`}
                    >
                      <span className="pr-2">
                        <i className="fa-solid fa-city"></i>
                      </span>
                      Barangay
                    </button>
                    <button
                      onClick={()=> handleActive("News")}
                      className={`text-[.8rem] sm:text-[1rem] px-2 py-2 rounded-lg flex justify-center items-center hover:bg-primary hover:text-white border border-primary w-[48%] sm:w-[31%] lg:w-[100%] ${active === "News" ? "bg-primary text-white" : ""}`}
                    >
                      <span className="pr-2">
                        <i className="fa-regular fa-newspaper"></i>
                      </span>
                      News
                    </button>
                    <button
                       onClick={()=> handleActive("Announcement")}
                      className={`text-[.8rem] sm:text-[1rem] px-2 py-2 rounded-lg flex justify-center items-center hover:bg-primary hover:text-white border border-primary w-[48%] sm:w-[31%] lg:w-[100%] ${active === "Announcement" ? "bg-primary text-white" : ""}`}
                    >
                      <span className="pr-2">
                        <i className="fa-solid fa-bullhorn"></i>
                      </span>
                      Announcement
                    </button>
                      <Link
                        to="/upload"
                        className="text-[.8rem] sm:text-[1rem] px-2 py-2 rounded-lg flex justify-center items-center hover:bg-primary hover:text-white border border-primary w-[48%] sm:w-[48%] lg:w-[100%]"
                      >
                        <button className="">
                          <span className="pr-2">
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                          </span>
                          Publish
                        </button>
                      </Link>
                    
                    <Link to="/chatspage" className="text-[.8rem] sm:text-[1rem] px-2 py-2 rounded-lg flex justify-center items-center hover:bg-primary hover:text-white border border-primary w-[48%] sm:w-[48%] lg:w-[100%]">
                    
                    <span className="pr-2">
                      <i className="fa-solid fa-message"></i>
                    </span>
                    Chats
                  </Link>
                  <Link to="/conference" className="text-[.8rem] sm:text-[1rem] px-2 py-2 rounded-lg flex justify-center items-center hover:bg-primary hover:text-white border border-primary w-[48%] sm:w-[48%] lg:w-[100%]">
                  
                    <span className="pr-2">
                      <i className="fa-solid fa-camera"></i>
                    </span>
                    Meeting
                  </Link>
                  </div>

                  {/* DATA */}
                  <div className="bg-purewhite border rounded-lg p-3 col-span-5 dark:bg-darkModeGray lg:col-span-9 lg:p-10">
                    {active === "Home" && (
                        <div className="pb-10">
                          <div className="grid grid-cols-6 lg:grid-cols-12 gap-3">
                            <img
                              className="pb-5 w-full  col-span-6  sm:pb-0"
                              src={municipalityDetails.mayorImg}
                              alt="Mayor"
                            />
                            <div className="text-[.8rem] sm:text-[1rem] col-span-6">
                              {municipalityDetails.mayorDescription}
                            </div>
                          </div>
                        </div> 
                    )}

                    {active === "About" && (
                      <div>
                        <h2 className="text-center text-4xl py-10 font-semibold">
                          What is {municipalityDetails.title}
                        </h2>
                        <img
                          src={municipalityDetails.image}
                          alt={municipalityDetails.alt}
                          className="w-screen h-[full] object-cover mx-auto"
                        />
                        <div className="text-[.8rem] pt-5 sm:text-[1rem]">
                          {municipalityDetails.description}
                        </div>
                      </div>
                    )}

                    {active === "Barangay" && (
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto">
                        {municipalityDetails.barangayList.map(
                          (barangayGubatList) => {
                            const { id, title, url } = barangayGubatList;
                            
                            return (
                              <Link
                                to={url}
                                key={id}
                                className={`text-primary border border-white dark:border-darkModeGray rounded-lg transition-transform duration-500 transform-gpu hover:scale-110 hover:bg-primary hover:text-white dark:hover:bg-primary dark:bg-darkModeBlack flex justify-center items-center  ${barangayGubatList.complete?"bg-primary text-white":""}`}
                                style={{
                                  boxShadow: "0 0 15px -5px rgba(0, 0, 0, 0.5)",
                                }}
                                onClick={() => window.scrollTo(0, 0)}
                              >
                                
                                  <div className=" py-2 rounded-lg ">
                                    <p className="__municipality-sub-heading sm:text-[12px] md:text-[16px] font-semibold text-center ">
                                      {title}
                                    </p>
                                  </div>
                                
                              </Link>
                            );
                          }
                        )}
                      </div>
                    )}
                    {active === "News" && (
                      <Image
                        data={municipalityDetails}
                        type="municipalityNews"
                      />
                    )}
                    {active === "Announcement" && (
                      <Image
                        data={municipalityDetails}
                        type="municipalityAnnouncement"
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        </AnimatedPage>
      );
    } else {
      return (
        <AnimatedPage>
          <div className="py-40 flex justify-center items-center text-5xl h-screen">
            Details not found for {window.location.pathname}
          </div>
        </AnimatedPage>
      );
    }
  } else {
    return (
      <AnimatedPage>
        <div className="py-40 flex justify-center items-center text-5xl h-screen">
          Details not found for {window.location.pathname}
        </div>
      </AnimatedPage>
    );
  }
};
