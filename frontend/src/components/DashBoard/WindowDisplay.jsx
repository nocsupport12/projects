import React, { useState } from "react";
import { useEffect } from "react";
// IMPORT COMPONENTS
import { Profile } from "./Windows/Profile";
import { Employee } from "./Windows/Employee";
import { Chats } from "./Windows/Chats";
import { JobOrder } from "./Windows/JobOrder";

export const WindowDisplay = ({
  userDetails,
  tab,
  setTab,
  LoadingWindow,
  display,
  setDisplay,
  setIsLoaded,
  allUsers,
  setAllUsers,
  search,
}) => {
  //   DISPLAY TOGGLE
  useEffect(() => {
    switch (tab) {
      case "profile":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(<Profile userDetails={userDetails} />);
        }, 1000);
        break;
      case "employee":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(<Employee userDetails={userDetails} />);
        }, 1000);
        break;
      case "sales":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(
            <JobOrder
              personnel="sales"
              userDetails={userDetails}
              allUsers={allUsers}
              setAllUsers={setAllUsers}
            />
          );
        }, 1000);
        break;
      case "support":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(
            <JobOrder
              personnel="support"
              userDetails={userDetails}
              allUsers={allUsers}
              setAllUsers={setAllUsers}
            />
          );
        }, 1000);
        break;
      case "chats":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(<Chats userDetails={userDetails} />);
        }, 1000);
        break;
      case "dispatch":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(
            <JobOrder
              allUsers={allUsers}
              setAllUsers={setAllUsers}
              personnel="dispatch"
              userDetails={userDetails}
            />
          );
        }, 1000);
        break;
      case "noc":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(
            <JobOrder
              allUsers={allUsers}
              setAllUsers={setAllUsers}
              personnel="noc"
              userDetails={userDetails}
            />
          );
        }, 1000);
        break;
      case "accounting":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(
            <JobOrder
              allUsers={allUsers}
              setAllUsers={setAllUsers}
              personnel="accounting"
              userDetails={userDetails}
            />
          );
        }, 1000);
        break;
      case "osp":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(
            <JobOrder
              allUsers={allUsers}
              setAllUsers={setAllUsers}
              personnel="osp"
              userDetails={userDetails}
            />
          );
        }, 1000);
        break;
      case "completed":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(
            <JobOrder personnel="completed" userDetails={userDetails} />
          );
        }, 1000);
        break;

      default:
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(<Profile userDetails={userDetails} />);
        }, 1000);
        break;
    }
  }, [tab]);

  return <div>{display}</div>;
};
