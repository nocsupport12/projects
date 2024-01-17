import { Link, useParams } from "react-router-dom";
import { useState } from "react";

// IMPORT JS FORMAT
import { ProvinceData } from "../../components/JSFormat/ProvinceData";

// IMPORT FRAMER MOTION
import { AnimatedPage } from "../../components/FramerMotion/AnimatedPage";

// import css
import "../css/municipality.css";

export const Provinces = () => {

  const [active, setActive] = useState("Home")

  const handleActive = (active) => {
    setActive(active)
    window.scrollTo(0, 0)
  }


  const { province } = useParams();
  const MunicipalityData = ProvinceData.find((el) => el.link === province);




  if (MunicipalityData) {
    let municipalityDetails = ProvinceData.find(
      (el) => el.link === province
      
    )
    if (municipalityDetails) {
      

    return (
      <AnimatedPage>
          <>
            <section className="font-poppins bg-semidimLight  py-[4.5rem] dark:bg-darkModeBlack">
              <div className="bg-green w-full py-20 text-center">
                <h2 className="text-3xl sm:text-5xl font-bold text-center py-2 dark:text-black uppercase">
                  WELCOME TO {municipalityDetails.title}
                </h2>
              </div>
              <div className="container mx-auto ">
                <div className="grid grid-cols-4 px-3 sm:grid-cols-4 lg:grid-cols-12 2xl:grid-cols-12 gap-10 pt-10 ">

                  {/* BUTTONS */}
                  <div className="bg-purewhite border rounded-lg py-5 flex flex-wrap justify-around gap-3 px-3 first-letter: col-span-5 top-20 h-max dark:bg-darkModeGray  sm:col-span-5 lg:sticky lg:flex-col lg:col-span-3 lg:px-5 2xl:px-10 ">
                    <button
                      onClick={()=> handleActive("Home")}
                      className={`text-[.8rem] sm:text-[1rem] hover:bg-primary hover:text-white px-2 py-2 rounded-lg flex justify-center items-center  border border-primary w-[48%] sm:w-[31%] lg:w-[100%] ${active === "Home" ? "bg-primary text-white" : ""} `}
                    >
                      <span className="pr-2">
                        <i className="fa-solid fa-house"></i>
                      </span>
                      Home
                    </button>
                    <button
                       onClick={()=> handleActive("About")}
                      className={`text-[.8rem] sm:text-[1rem] hover:bg-primary hover:text-white px-2 py-2 rounded-lg flex justify-center items-center  border border-primary w-[48%] sm:w-[31%] lg:w-[100%] ${active === "About" ? "bg-primary text-white" : ""} `}
                    >
                      <span className="pr-2">
                        <i className="fa-solid fa-circle-info"></i>
                      </span>
                      About
                    </button>
                    <button
                       onClick={()=> handleActive("Municipality")}
                      className={`text-[.8rem] sm:text-[1rem] hover:bg-primary hover:text-white px-2 py-2 rounded-lg flex justify-center items-center  border border-primary w-[48%] sm:w-[31%] lg:w-[100%] ${active === "Municipality" ? "bg-primary text-white" : ""} `}
                    >
                      <span className="pr-2">
                        <i className="fa-solid fa-city"></i>
                      </span>
                      Municipality
                    </button>
                    <Link
                        to="/upload"
                        className="text-[.8rem] sm:text-[1rem] hover:bg-primary hover:text-white px-2 py-2 rounded-lg flex justify-center items-center  border border-primary w-[48%] sm:w-[31%] lg:w-[100%]"
                      >
                        <button className="">
                          <span className="pr-2">
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                          </span>
                          Publish
                        </button>
                      </Link>

                    <Link to="/chatspage" className="text-[.8rem] sm:text-[1rem] hover:bg-primary hover:text-white px-2 py-2 rounded-lg flex justify-center items-center  border border-primary w-[48%] sm:w-[31%] lg:w-[100%]">
                    
                      <span className="pr-2">
                        <i className="fa-solid fa-message"></i>
                      </span>
                      Chats
                    </Link>
                    <Link to="/conference" className="text-[.8rem] sm:text-[1rem] hover:bg-primary hover:text-white px-2 py-2 rounded-lg flex justify-center items-center  border border-primary w-[48%] sm:w-[31%] lg:w-[100%]">
                    
                      <span className="pr-2">
                        <i className="fa-solid fa-camera"></i>
                      </span>
                      Meeting
                    </Link>
                  </div>

                  {/* DATA */}
                  <div className="bg-purewhite border rounded-lg p-3 col-span-5 dark:bg-darkModeGray lg:col-start-4 lg:col-end-13 lg:p-10">
                    {active === "Home" && (
                      <div>
                        <div className="pb-10">
                          <div >
                            
                            <div className="text-[.8rem] sm:text-[1rem] col-span-6">
                              {municipalityDetails.sorsogonHomeDetails}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {active === "About" && (
                      <div>
                        <h2 className="text-center text-4xl py-10 font-semibold">
                          What is {municipalityDetails.title}
                        </h2>
                        <div>
                          {municipalityDetails.sorsogonAboutDetails}
                        </div>
                      </div>
                    )}
                    {active === "Municipality" && (
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-10 mx-auto">
                        {municipalityDetails.municipalityList.map(
                          (barangayGubatList) => {
                            const { id, title, url } = barangayGubatList;
                            return (
                              <Link
                                to={`${window.location.pathname}${url}`}
                                key={id}
                                className={`text-primary border border-white dark:border-darkModeGray rounded-lg transition-transform duration-500 transform-gpu hover:scale-110 hover:bg-primary hover:text-white dark:hover:bg-primary dark:bg-darkModeBlack flex justify-center items-center ${barangayGubatList.complete?"bg-primary text-white":""}`}
                                style={{
                                  boxShadow: "0 0 15px -5px rgba(0, 0, 0, 0.5)",
                                }}
                                onClick={() => window.scrollTo(0, 0)}
                              >
                                <div>
                                  <div className="__barangay-gubat py-2 rounded-lg ">
                                    <p className="__barangay-gubat-sub-heading sm:text-[1.2rem] font-semibold text-center ">
                                      {title}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            );
                          }
                        )}
                      </div>
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
        <section className="py-40 flex justify-center items-center">
          <h2 className="text-3xl text-center">Incorrect URL testing</h2>
        </section>
      </AnimatedPage>
    );
  }
};
}
