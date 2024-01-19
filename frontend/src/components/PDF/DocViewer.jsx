import React from "react";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "./JobOrder";
import { IoMdClose } from "react-icons/io";

export const DocViewer = ({ setPrintView, jobOrderView }) => (
  <section
    className="inset-0 fixed w-[100vw] h-[100vh] bg-gray-350"
    style={{ zIndex: 99999999 }}
  >
    <div className="flex justify-end">
      <p
        className="text-2xl hover:cursor-pointer px-4"
        onClick={() => {
          setPrintView(false);
        }}
      >
        <IoMdClose />
      </p>
    </div>
    <PDFViewer className="w-[100%] h-[95%]">
      <MyDocument jobOrderView={jobOrderView} />
    </PDFViewer>
  </section>
);
