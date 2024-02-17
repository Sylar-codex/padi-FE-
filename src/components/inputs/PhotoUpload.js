import React from "react";
import Details from "../Details";
import { CiCamera } from "react-icons/ci";

function PhotoUpload({ setOpenDropDown, detailInfo }) {
  return (
    <div
      onClick={() => {
        setOpenDropDown((prev) => !prev);
      }}
      className="relative group/item rounded-full w-12 h-12 bg-gray-10 hover:cursor-pointer"
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-6/12">
          <CiCamera className="text-2xl text-center" />
        </div>
      </div>
      <Details info={detailInfo} />
    </div>
  );
}

export default PhotoUpload;
