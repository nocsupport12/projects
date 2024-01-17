import { Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

// IMPORT FRAMER MOTION
import { AnimatePresence } from "framer-motion";

// IMPORT PAGES
import {
  Home,
  About,
  Donation,
  News,
  Provinces,
  SignIn,
  Upload,
  UploadVideo,
  Barangay,
  Municipality,
  Faq,
  MunicipalityAbout,
  PageNotFound,
  Testing,
  DashBoard,
  TestingPurposes,
} from "../pages/compiler/index";


import { useEffect, useState } from "react";
import { ConferenceCall } from "../components/VideoSdk/src";
import { ChatsPage } from "../pages/partial/ChatsPage";

// IMPORT JSFORMAT
// import { MunicipalityDetails } from "../components/JSFormat/Municipality"
export const AllRoutes = (userDetails) => {
  const user = localStorage.getItem("user");
  const location = useLocation();
  const [locationHistory, setLocationHistory] = useState([]);
  let authentication;
  let signInAuthentication;
  useEffect(() => {
    if (locationHistory?.length < 2) {
      setLocationHistory([...locationHistory, location.pathname]);
    } else {
      setLocationHistory([locationHistory[1], location.pathname]);
    }
  }, [location]);
  
  useEffect(() => {
    if (locationHistory?.length > 1) {
      if (
        locationHistory[0] === "/conference" &&
        locationHistory[1] !== "/conference"
      ) {
        window.location.reload(false);
      }
    }
  }, [locationHistory]);
  if (!user) {
    signInAuthentication = <Route path="/signin" element={<SignIn />}></Route>;
  } else {
    signInAuthentication = (
      <Route path="/signin" element={<Navigate to="/" />} />
    );
  }

  if (user) {
    authentication = (
      <>
        <Route
          path="/upload"
          element={<Upload userDetails={userDetails.userDetails} />}
        ></Route>
        <Route path="/conference" element={<ConferenceCall />}></Route>
        <Route path="/chatspage" element={<ChatsPage />}></Route>
        <Route
          path="/dashboard"
          element={<DashBoard userDetails={userDetails} />}
        ></Route>
      </>
    );
  } else {
    authentication = (
      <>
        <Route path="/upload" element={<Navigate to="/signin" />} />
        <Route path="/conference" element={<Navigate to="/signin" />} />
        <Route path="/chatspage" element={<Navigate to="/signin" />} />
        <Route
          path="/dashboard"
          userDetails={userDetails.userDetails}
          element={<Navigate to="/signin" />}
        />
      </>
    );
  }
  return (
    <div className="dark:bg-black dark:text-white">
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/donation" element={<Donation />}></Route>
          <Route path="/news" element={<News />}></Route>
          {/* <Route path="/bicol" element={<Provinces />}></Route> */}
          <Route path="/bicol/:province" element={<Provinces />}></Route>
          <Route
            path="/bicol/:province/:municipality"
            element={
              <MunicipalityAbout userDetails={userDetails.userDetails} />
            }
          ></Route>
          <Route
            path="/bicol/:province/:municipality/:barangay"
            element={<Barangay userDetails={userDetails.userDetails} />}
          ></Route>
          <Route path="/faq" element={<Faq />}></Route>

          <Route path="/uploadvideo" element={<UploadVideo />}></Route>
          {signInAuthentication}
          {authentication}
          <Route path="testing" element={<Testing />}></Route>
          <Route path="/testingpurposes" element={<TestingPurposes />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};
