// import { Link, useParams } from "react-router-dom";

// // IMPORT JS FORMAT
// import { ProvinceData } from "../../components/JSFormat/ProvinceData";

// // IMPORT FRAMER MOTION
// import { AnimatedPage } from "../../components/FramerMotion/AnimatedPage";

// // components
// import { Image } from "./Image";
// // css
// import "../css/municipality-about.css";
// import { useState } from "react";

// export const MunicipalityAbout = (userDetails) => {
//   const [home, setHome] = useState(true);
//   const [barangay, setBarangay] = useState(false);
//   const [about, setAbout] = useState(false);
//   const [news, setNews] = useState(false);
//   const [announcement, setAnnouncement] = useState(false);
//   const [uploads, setUploads] = useState(false);
//   // const municipalityDetails =  municipalityDetails.find((barangay)=>barangay.name===window.location.pathname.split('/')[2])

//   const { province, municipality } = useParams();
//   // console.log(province, municipality)
//   const MunicipalityData = ProvinceData.find((el) => el.link === province);
//   const handleHome = () => {
//     setHome(true);
//     setAbout(false);
//     setNews(false);
//     setAnnouncement(false);
//     setUploads(false);
//     setBarangay(false);
//     window.scrollTo(0, 0);
//   };
//   const handleAbout = () => {
//     setHome(false);
//     setAbout(true);
//     setNews(false);
//     setAnnouncement(false);
//     setUploads(false);
//     setBarangay(false);
//     window.scrollTo(0, 0);
//   };
//   const handleBarangay = () => {
//     setHome(false);
//     setAbout(false);
//     setNews(false);
//     setAnnouncement(false);
//     setUploads(false);
//     setBarangay(true);
//     window.scrollTo(0, 0);
//   };
//   const handleNews = () => {
//     setHome(false);
//     setAbout(false);
//     setNews(true);
//     setAnnouncement(false);
//     setUploads(false);
//     setBarangay(false);
//     window.scrollTo(0, 0);
//   };
//   const handleAnnouncement = () => {
//     setHome(false);
//     setAbout(false);
//     setNews(false);
//     setAnnouncement(true);
//     setUploads(false);
//     setBarangay(false);
//     window.scrollTo(0, 0);
//   };
//   const handleUploads = () => {
//     setHome(false);
//     setAbout(false);
//     setNews(false);
//     setAnnouncement(false);
//     setUploads(true);
//     setBarangay(false);
//     window.scrollTo(0, 0);
//   };
//   if (MunicipalityData) {
//     let municipalityDetails = ProvinceData.find(
//       (el) => el.link === province
//     ).municipalityList.find((el) => el.url === "/" + municipality);
//     if (municipalityDetails) {
//       municipalityDetails = municipalityDetails.municipalityList[0];

//       return (
//         <AnimatedPage>
//           <>
//             <section className="font-poppins bg-semidimLight py-[4.5rem] dark:bg-darkModeBlack">
//               <div className="bg-green w-full px-5 py-20 text-center">
//                 <h2 className="text-3xl sm:text-5xl font-bold text-center py-2 dark:text-black uppercase">
//                   WELCOME TO {municipalityDetails.title}
//                 </h2>
//               </div>
//               <div className="container mx-auto ">
//                 <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-12 2xl:grid-cols-12 gap-10 px-10 pt-10 ">
//                   <div className="bg-purewhite border rounded-lg py-5 flex justify-center gap-3  col-span-5 top-20 h-max dark:bg-darkModeGray  sm:col-span-5 lg:sticky lg:flex-col lg:col-span-3 lg:px-5 2xl:px-10">
//                     <button
//                       onClick={handleHome}
//                       className="text-[.8rem] sm:text-[1rem] bg-primary px-2 py-2 rounded-lg flex justify-center items-center hover:bg-transparent border border-primary"
//                     >
//                       <span className="pr-2">
//                         <i className="fa-solid fa-house"></i>
//                       </span>
//                       Home
//                     </button>
//                     <button
//                       onClick={handleAbout}
//                       className="text-[.8rem] sm:text-[1rem] bg-primary px-2 py-2 rounded-lg flex justify-center items-center hover:bg-transparent border border-primary"
//                     >
//                       <span className="pr-2">
//                         <i className="fa-solid fa-circle-info"></i>
//                       </span>
//                       About
//                     </button>
//                     <button
//                       onClick={handleBarangay}
//                       className="text-[.8rem] sm:text-[1rem] bg-primary px-2 py-2 rounded-lg flex justify-center items-center hover:bg-transparent border border-primary"
//                     >
//                       <span className="pr-2">
//                         <i className="fa-solid fa-city"></i>
//                       </span>
//                       Barangay
//                     </button>
//                     <button
//                       onClick={handleNews}
//                       className="text-[.8rem] sm:text-[1rem] bg-primary px-2 py-2 rounded-lg flex justify-center items-center hover:bg-transparent border border-primary"
//                     >
//                       <span className="pr-2">
//                         <i className="fa-regular fa-newspaper"></i>
//                       </span>
//                       News
//                     </button>
//                     <button
//                       onClick={handleAnnouncement}
//                       className="text-[.8rem] sm:text-[1rem] bg-primary px-2 py-2 rounded-lg flex justify-center items-center hover:bg-transparent border border-primary"
//                     >
//                       <span className="pr-2">
//                         <i className="fa-solid fa-bullhorn"></i>
//                       </span>
//                       Announcement
//                     </button>
//                     {userDetails.userDetails === false ? (
//                       ""
//                     ) : (
//                       <Link
//                         to="/upload"
//                         className="text-[.8rem] sm:text-[1rem] bg-primary px-2 py-2 rounded-lg flex justify-center items-center hover:bg-transparent border border-primary"
//                       >
//                         <button className="">
//                           <span className="pr-2">
//                             <i className="fa-solid fa-cloud-arrow-up"></i>
//                           </span>
//                           Publish
//                         </button>
//                       </Link>
//                     )}
//                   </div>
//                   <div className="bg-purewhite border rounded-lg p-3 col-span-5 dark:bg-darkModeGray lg:col-start-4 lg:col-end-13 lg:p-10">
//                     {home && (
//                       <div>
//                         <div className="pb-10">
//                           <div className="grid grid-cols-12 gap-3">
//                             <img
//                               className="pb-5 w-full object-contain col-span-6 my-auto sm:pb-0"
//                               src={municipalityDetails.mayorImg}
//                               alt="Mayor"
//                             />
//                             <div className="text-[.8rem] sm:text-[1rem] col-span-6">
//                               {municipalityDetails.mayorDescription}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                     {about && (
//                       <div>
//                         <h2 className="text-center text-4xl py-10 font-semibold">
//                           What is {municipalityDetails.title}
//                         </h2>
//                         <img
//                           src={municipalityDetails.image}
//                           alt={municipalityDetails.alt}
//                           className="w-screen h-[full] object-cover mx-auto"
//                         />
//                         <div className="text-[.8rem] pt-5 sm:text-[1rem]">
//                           {municipalityDetails.description}
//                         </div>
//                       </div>
//                     )}
//                     {barangay && (
//                       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-10 mx-auto">
//                         {municipalityDetails.barangayList.map(
//                           (barangayGubatList) => {
//                             const { id, title, url } = barangayGubatList;
//                             return (
//                               <Link
//                                 to={url}
//                                 key={id}
//                                 className="text-primary border border-white dark:border-darkModeGray rounded-lg transition-transform duration-500 transform-gpu hover:scale-110 hover:bg-primary hover:text-white dark:hover:bg-primary dark:bg-darkModeBlack flex justify-center items-center"
//                                 style={{
//                                   boxShadow: "0 0 15px -5px rgba(0, 0, 0, 0.5)",
//                                 }}
//                                 onClick={() => window.scrollTo(0, 0)}
//                               >
//                                 <div>
//                                   <div className="__barangay-gubat py-2 rounded-lg ">
//                                     <p className="__barangay-gubat-sub-heading sm:text-[1.2rem] font-semibold text-center ">
//                                       {title}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </Link>
//                             );
//                           }
//                         )}
//                       </div>
//                     )}
//                     {news && (
//                       <Image
//                         data={municipalityDetails}
//                         type="municipalityNews"
//                       />
//                     )}
//                     {announcement && (
//                       <Image
//                         data={municipalityDetails}
//                         type="municipalityAnnouncement"
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </>
//         </AnimatedPage>
//       );
//     } else {
//       return (
//         <AnimatedPage>
//           <div className="py-40 flex justify-center items-center text-5xl h-screen">
//             Details not found for {window.location.pathname}
//           </div>
//         </AnimatedPage>
//       );
//     }
//   } else {
//     return (
//       <AnimatedPage>
//         <div className="py-40 flex justify-center items-center text-5xl h-screen">
//           Details not found for {window.location.pathname}
//         </div>
//       </AnimatedPage>
//     );
//   }
// };
