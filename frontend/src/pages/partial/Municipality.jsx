import { Link, useParams } from "react-router-dom";

// IMPORT JS FORMAT
import { ProvinceData } from "../../components/JSFormat/ProvinceData";

// IMPORT FRAMER MOTION
import { AnimatedPage } from "../../components/FramerMotion/AnimatedPage";

// import css
import "../css/municipality.css";

export const Municipality = () => {
  const { province } = useParams();
  const MunicipalityData = ProvinceData.find((el) => el.link === province);

  if (MunicipalityData) {
    return (
      <AnimatedPage>
        <>
          <section className="font-poppins py-40 px-10">
            <div className="container mx-auto ">
              <h2 className="text-[3rem] md:text-[3.5rem] lg:text-[4rem] 2xl:text-[4.5rem] leading-none text-primary font-dancing text-center pb-20">
                List of Municipality
              </h2>
              <div className="grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-10 mx-auto">
                {MunicipalityData.municipalityList.map((municipalityList) => {
                  const { id, title, url } = municipalityList;
                  return (
                    <Link
                      to={`/bicol/${MunicipalityData.link}${url}`}
                      key={id}
                      className={`text-primary flex justify-center items-center border border-white dark:border-darkModeGray rounded-lg transition-transform duration-500 transform-gpu hover:scale-110 hover:bg-primary hover:text-white dark:hover:bg-primary dark:bg-darkModeGray `}
                      style={{ boxShadow: "0 0 15px -5px rgba(0, 0, 0, 0.5)" }}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <div>
                        <div className="__municipality sm:px-8 sm:py-5 rounded-lg ">
                          <p className="__municipality-sub-heading sm:text-[1.2rem] font-semibold text-center">
                            {title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
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
