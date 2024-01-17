import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { Image } from "./Image";

// IMPORT PAGES
import { BarangayAbout } from "./BarangayAbout";

// IMPORT COMPONENTS
import { AnimatedPage } from "../../components/FramerMotion/AnimatedPage";

// IMPORT JS FORMAT
import { ProvinceData } from "../../components/JSFormat/ProvinceData";

//IMPORT CSS
import "../css/barangay.css"

export const Barangay = (userDetails) => {
  const { province, municipality, barangay } = useParams();
  const [about, setAbout] = useState(true);
  const [community, setCommunity] = useState(false);
  const [uploads, setUploads] = useState(false);
  const [active, setActive] = useState("About")

  const handleActive = (active) => {
    setActive(active)
  }

  const handleAbout = () => {
    setAbout(true);
    setCommunity(false);
    setUploads(false);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  };
  const handleCommunity = () => {
    setAbout(false);
    setCommunity(true);
    setUploads(false);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  };
  const handleUploads = () => {
    setAbout(false);
    setCommunity(false);
    setUploads(true);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  };

  const MunicipalityData = ProvinceData.find((el) => el.link === province);

  if (MunicipalityData) {
    let municipalityDetails = ProvinceData.find(
      (el) => el.link === province
    ).municipalityList.find((el) => el.url === "/" + municipality);

    if (municipalityDetails) {
      municipalityDetails = municipalityDetails.municipalityList[0];
      let barangayDetails = municipalityDetails.barangayList.find(
        (el) => el.url === barangay
      );

      if (barangayDetails) {
        return (
          <AnimatedPage>
            <>
              <section className="font-poppins bg-semidimLight py-[4.5rem] dark:bg-darkModeBlack">
                <div className="bg-green w-full px-5 py-20 text-center">
                  <h2 className="text-3xl  sm:text-5xl font-bold text-center py-2 dark:text-black uppercase">
                    WELCOME TO BARANGAY {barangayDetails.title}
                  </h2>
                </div>
                <div className="container mx-auto">
                  <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-12 2xl:grid-cols-12 gap-10 px-5 sm:px-10 pt-10">

                    {/* BUTTON */}
                    <div className="bg-purewhite border rounded-lg py-5 flex flex-wrap justify-between gap-3 px-3 first-letter: col-span-5 top-20 h-max dark:bg-darkModeGray  sm:col-span-5 lg:sticky lg:flex-col lg:col-span-3 lg:px-5 2xl:px-10">
                      <button
                        onClick={()=> handleActive("About")}
                        className={`__barangay text-[.8rem] sm:text-[1rem]  px-2 py-2 rounded-lg flex justify-center items-center hover:bg-primary hover:text-white border border-primary w-[48%]  lg:w-[100%] ${active === "About" ? "bg-primary text-white" : "" }`}
                      >
                        <span className="pr-2">
                          <i className="fa-solid fa-suitcase"></i>
                        </span>
                        About
                      </button>
                      <button
                        onClick={()=> handleActive("Barangay Activities")}
                        className={`__barangay text-[.8rem] sm:text-[1rem]  px-2 py-2 rounded-lg flex justify-center items-center hover:bg-primary hover:text-white border border-primary w-[48%]  lg:w-[100%] ${active === "Barangay Activities" ? "bg-primary text-white" : "" }`}
                      >
                        <span className="pr-2">
                          <i className="fa-solid fa-users"></i>
                        </span>
                        Barangay Activities
                      </button>
                      {userDetails.userDetails === false ? (
                        ""
                      ) : (
                        <Link
                          to="/upload"
                          className="text-[.8rem] sm:text-[1rem]  px-2 py-2 rounded-lg flex justify-center items-center hover:bg-primary hover:text-white border border-primary"
                        >
                          <button className="">
                            <span className="pr-2">
                              <i className="fa-solid fa-cloud-arrow-up"></i>
                            </span>
                            Publish
                          </button>
                        </Link>
                      )}
                    </div>
                    <div className="bg-purewhite border rounded-lg col-span-5 dark:bg-darkModeGray lg:col-start-4 lg:col-end-13">
                      {active === "About" && <BarangayAbout data={barangayDetails} />}

                      {active === "Barangay Activities" && (
                        <Image data={barangayDetails} type="barangayNews" />
                      )}
                    </div>
                  </div>
                  {/* <h2 className="text-[3rem] md:text-[3.5rem] lg:text-[4rem] 2xl:text-[4.5rem] leading-none text-primary font-dancing text-center pb-20">Bayan ng Gubat</h2> */}
                </div>
              </section>
            </>
          </AnimatedPage>
        );
      } else {
        return (
          <div className="py-40 flex justify-center items-center text-5xl h-screen">
            Details not found for {window.location.pathname}
          </div>
        );
      }
    } else {
      return (
        <div className="py-40 flex justify-center items-center text-5xl h-screen">
          Details not found for {window.location.pathname}
        </div>
      );
    }
  } else {
    return (
      <div className="py-40 flex justify-center items-center text-5xl h-screen">
        Details not found for {window.location.pathname}
      </div>
    );
  }
};
