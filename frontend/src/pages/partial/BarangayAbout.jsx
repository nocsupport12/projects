import { useParams } from "react-router-dom";

// IMPORT FRAMER MOTION
import { AnimatedPage } from "../../components/FramerMotion/AnimatedPage";

// IMPORT JS FORMAT
import { ProvinceData } from "../../components/JSFormat/ProvinceData";

export const BarangayAbout = (data) => {
  const { province, municipality, barangay } = useParams();

  const MunicipalityData = ProvinceData.find((el) => el.link === province);

  // console.log(MunicipalityData)
  const barangayDetails = data.data;

  return (
    <AnimatedPage>
      <section className="py-10 px-10">
        <div className="container mx-auto">
          <img
            src={barangayDetails.img}
            alt="Resort"
            className="w-full h-full rounded-lg max-h-[500px] object-contain"
          />
          <h2 className="2xl:text-[1.5rem] font-semibold py-10">
            What is {barangayDetails.title} ?
          </h2>
          {barangayDetails.description}
        </div>
      </section>
    </AnimatedPage>
  );
};
