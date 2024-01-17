import Sorsogon from "../../assets/provinces-img/sorsogon.jpg";
import CamarinesSur from "../../assets/provinces-img/camarines-sur.png";
import CamarinesNorte from "../../assets/provinces-img/camarines-norte.jpg";
import Albay from "../../assets/provinces-img/legazpi.png";
import { SorsogonDetails } from "./SorsogonDetails";
import { CamarinessurDetails } from "./CamarinessurDetails";
import { CamarinesnorteDetails } from "./CamarinesnorteDetails";
import { AlbayDetails } from "./AlbayDetails";

import Sorsogon1 from "../../assets/provinces-img/sorsogon-img/sorsogon1.jpg"
import Sorsogon2 from "../../assets/provinces-img/sorsogon-img/sorsogon2.jpg"
import Sorsogon3 from "../../assets/provinces-img/sorsogon-img/sorsogon3.jpg"

import SorsogonAbout from "../../assets/provinces-img/sorsogon-img/sorsogon-about.png"

export const ProvinceData = [
  {
    id: 1,
    img: Sorsogon,
    title: "Sorsogon",
    complete:"true",
    alt: "Sorsogon",
    link: "sorsogon",
    municipalityList: SorsogonDetails, // 15 municipalities in sorsogon
    sorsogonHomeDetails: (
      <>
        <div className="grid grid-cosl-4 sm:grid-cols-12 gap-3 pb-10">
          <div className="col-span-4 sm:col-span-6 my-auto h-full">
            <img
              className="pb-5 h-full w-full object-cover   sm:pb-0"
              src={Sorsogon1}
              alt="Mayor"/>
          </div>
          
          <div className="text-[.8rem] sm:text-[1rem] col-span-4 sm:col-span-6">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque harum, quos ipsam aperiam accusantium id ut facere architecto dignissimos nostrum quas praesentium at, sint ea! Voluptatem ea quis voluptatum eius!<span className="block pt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod tempore iure, laudantium optio tempora ad consequuntur ab illum unde officiis molestias cupiditate voluptatibus in natus maiores repellendus recusandae, dolorem sunt?</span></p>
            
          </div>
        </div>
        <div className="grid grid-cosl-4 sm:grid-cols-12 gap-3 pb-10">
          
          <div className="text-[.8rem] col-span-4 order-2 sm:text-[1rem] sm:col-span-6 sm:order-1">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque harum, quos ipsam aperiam accusantium id ut facere architecto dignissimos nostrum quas praesentium at, sint ea! Voluptatem ea quis voluptatum eius!<span className="block pt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod tempore iure, laudantium optio tempora ad consequuntur ab illum unde officiis molestias cupiditate voluptatibus in natus maiores repellendus recusandae, dolorem sunt?</span></p>
            
          </div>
          <div className="col-span-4 my-auto h-full order-1 sm:col-span-6 sm:order-2">
            <img
              className="pb-5 h-full w-full object-cover sm:pb-0"
              src={Sorsogon2}
              alt="Mayor"/>
          </div>
         
        </div>
        <div className="grid grid-cosl-4 sm:grid-cols-12 gap-3 pb-10">
          <div className="col-span-4 sm:col-span-6 my-auto h-full">
            <img
                className="pb-5 h-full w-full object-cover sm:pb-0"
                src={Sorsogon3}
                alt="Mayor"/>
          </div>
          
          <div className="text-[.8rem] sm:text-[1rem] col-span-4 sm:col-span-6">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque harum, quos ipsam aperiam accusantium id ut facere architecto dignissimos nostrum quas praesentium at, sint ea! Voluptatem ea quis voluptatum eius!<span className="block pt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod tempore iure, laudantium optio tempora ad consequuntur ab illum unde officiis molestias cupiditate voluptatibus in natus maiores repellendus recusandae, dolorem sunt?</span></p>
            
          </div>
        </div>
      </>

    ),
    sorsogonAboutDetails: (
      <>
        <div className="font-poppins">
          <img
            className="pb-5 w-full object-contain col-span-6 my-auto sm:pb-0"
            src={SorsogonAbout}
            alt="Mayor"/>
            <p className="pt-5 pb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ratione similique, ipsum, perspiciatis deserunt labore perferendis, necessitatibus facilis mollitia sunt sint ab saepe obcaecati nulla culpa impedit. Labore, cumque velit.</p>
            <p className="pb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid enim rem sunt. Enim obcaecati alias, velit, dolores nesciunt repudiandae aut dolorum accusantium maxime a, laboriosam exercitationem amet nulla optio veniam!</p>
            <p className="pb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis perferendis ad obcaecati praesentium inventore, quod quasi ratione minus, ipsum voluptas itaque eveniet illo mollitia! Itaque commodi sit beatae nisi accusantium?</p>
            <p className="pb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid enim rem sunt. Enim obcaecati alias, velit, dolores nesciunt repudiandae aut dolorum accusantium maxime a, laboriosam exercitationem amet nulla optio veniam!</p>
            <p className="pb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid enim rem sunt. Enim obcaecati alias, velit, dolores nesciunt repudiandae aut dolorum accusantium maxime a, laboriosam exercitationem amet nulla optio veniam!</p>
        </div>
      </>
    ),
  },
  {
    id: 2,
    img: CamarinesSur,
    title: "Camarines Sur",
    alt: "Camarines Sur",
    link: "camarinessur",
    municipalityList: CamarinessurDetails,
  },
  {
    id: 3,
    img: CamarinesNorte,
    title: "Camarines Norte",
    alt: "Camarines Norte",
    link: "camarinesnorte",
    municipalityList: CamarinesnorteDetails,
  },
  {
    id: 4,
    img: Albay,
    title: "Albay",
    alt: "Albay",
    link: "albay",
    municipalityList: AlbayDetails,
  },
];
