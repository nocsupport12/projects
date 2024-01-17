import React, { useState } from "react";
import { useEffect } from "react";
// IMPORT COMPONENTS
import { Profile } from "./Windows/Profile";
import { Analytics } from "./Windows/Analytics";
import { Employee } from "./Windows/Employee";
import { Inventory } from "./Windows/Inventory";
import { Sales } from "./Windows/Sales";
import { Support } from "./Windows/Support";
import { Clients } from "./Windows/Clients";
import { Chats } from "./Windows/Chats";
import { JobOrder } from "./Windows/JobOrder";
import { FundRequest } from "./Windows/FundRequest";

export const WindowDisplay = ({
  userDetails,
  tab,
  setTab,
  LoadingWindow,
  display,
  setDisplay,
  setIsLoaded,
  allClients,
  setAllClients,
  search
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
      case "analytics":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(<Analytics userDetails={userDetails} />);
        }, 1000);
        break;
      case "inventory":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(<Inventory userDetails={userDetails} />);
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
          setDisplay(<Sales userDetails={userDetails} />);
        }, 1000);
        break;
      case "support":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(<Support userDetails={userDetails} />);
        }, 1000);
        break;
      case "clients":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(
            <Clients
              search={search}
              allClients={allClients}
              setAllClients={setAllClients}
              userDetails={userDetails}
              setDisplay={setDisplay}
              LoadingWindow={LoadingWindow}
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
      case "joborder":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(<JobOrder userDetails={userDetails} />);
        }, 1000);
        break;
      case "fundrequest":
        setDisplay(LoadingWindow);
        setTimeout(() => {
          setDisplay(<FundRequest userDetails={userDetails} />);
        }, 1000);
        break;
      case "loading":
        setDisplay(LoadingWindow);

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
