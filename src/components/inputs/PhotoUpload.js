import React from "react";
import Details from "../Details";
import { CiCamera } from "react-icons/ci";

function PhotoUpload({ id, setPhtoto }) {
  return (
    // before stopping here I felt the first div was unneccesary and the third div will be
    // what I use

    <div className="relative group/item rounded-full w-12 h-12 bg-gray-10">
      <label htmlFor={id}>
        <input
          id={id}
          className="peer hidden"
          accept="image/png, image/jpeg"
          type="file"
          onChange={(e) => {
            setPhtoto(URL.createObjectURL(e.target.files[0]));
          }}
        />
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-6/12">
            <CiCamera className="text-2xl text-center" />
          </div>
        </div>
        <Details info={"add photo"} />
      </label>
    </div>
  );
}

export default PhotoUpload;
