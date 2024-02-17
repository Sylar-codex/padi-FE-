import React from "react";
import love from "../../assets/contacts-img/love .jpeg";
import { FaXmark } from "react-icons/fa6";

function ProfilePicView({ setProfilePicViewModal, profilePic }) {
  return (
    <div className="bg-bg-modal fixed w-screen h-screen top-0 left-0 overflow-hidden z-20">
      <div className="w-full flex justify-end">
        <FaXmark
          onClick={() => {
            setProfilePicViewModal(false);
          }}
          className="text-3xl hover:cursor-pointer"
        />
      </div>

      <div className="lg:w-4/12 w-11/12 h-3/5 m-auto bg-white mt-28 rounded-xl relative">
        <div className="w-full h-full rounded-t-xl">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={profilePic}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePicView;
