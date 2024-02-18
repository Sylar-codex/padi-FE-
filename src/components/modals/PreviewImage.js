import React from "react";
import { FaXmark } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";

function PreviewImage({
  imagePreview,
  setImagePreview,
  setProfilePic,
  handleSubmitImage,
}) {
  return (
    <div className="bg-bg-modal fixed w-screen h-screen top-0 left-0 overflow-hidden z-30">
      <div className="lg:w-4/12 w-11/12 h-3/5 m-auto bg-white mt-28 rounded-xl relative">
        <div className="w-full h-[90%] rounded-t-xl">
          <img
            className="w-full h-full object-cover rounded-t-xl"
            src={imagePreview}
            alt=""
          />
        </div>
        <div className="absolute bottom-0 left-0 flex w-full rounded-b-xl h-12">
          <button
            onClick={() => {
              // URL.revokeObjectURL(imagePreview);
              setImagePreview(null);
            }}
            className="bg-error-50 text-white w-1/2 flex justify-center items-center"
          >
            <FaXmark className="text-3xl" />
          </button>
          <button
            onClick={() => {
              handleSubmitImage();
              setProfilePic(imagePreview);
              setImagePreview(null);
            }}
            className="bg-active text-white w-1/2 flex justify-center items-center"
          >
            <IoCheckmark className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewImage;
