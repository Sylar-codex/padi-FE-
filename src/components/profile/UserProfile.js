import React, { useState } from "react";
import { AiOutlineExclamationCircle, AiOutlineMail } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import userProfile from "../../assets/icons/user_profile.svg";
import PhotoUpload from "../inputs/PhotoUpload";
import { FaUserCircle } from "react-icons/fa";
import { IoPencilOutline, IoCheckmark } from "react-icons/io5";

function UserProfile({ setOpenUserProfile }) {
  const [profilePic, setProfilePic] = useState(userProfile);
  const [editDesc, setEditDesc] = useState(false);
  const [value, setValue] = useState("Hello I am using the Padi app");

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="w-full h-full sticky top-0 z-10">
      <div className="flex space-x-4 items-center text-xl text-white bg-active px-5 py-4">
        <FaArrowLeft
          onClick={() => {
            setOpenUserProfile(false);
          }}
          className="hover:cursor-pointer"
        />
        <p className="font-semibold">Profile</p>
      </div>
      <div>
        <div className="h-48 px-7 py-10 bg-info-10">
          <div className="relative">
            <div className="absolute top-16 left-48 rounded-full w-32 h-32 border-4 border-white bg-gray-70">
              <div className="w-full h-full">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={profilePic}
                />
              </div>
              <div className="absolute top-10 right-10">
                <PhotoUpload setPhtoto={setProfilePic} id="profile_photo" />
              </div>
            </div>
          </div>
        </div>
        {/*User info */}
        <div className="bg-gray-20">
          <div className="flex items-center space-x-6 py-10 px-7 text-xl bg-white">
            <FaUserCircle />
            <p className="font-medium text-gray-100">Sylarvi</p>
          </div>
          {/* about and email address */}
          <div className="py-5 px-7 mt-5 cursor-default bg-white">
            <h3 className="text-gray-80">About and Email</h3>
            <div className="flex justify-between items-center">
              <div className="text-gray-100 font-medium mt-3 text-lg flex items-center w-[30rem] space-x-2">
                <AiOutlineExclamationCircle className="text-gray-70 text-xl" />
                <div className="w-5/6">
                  {editDesc ? (
                    <textarea
                      value={value}
                      className="outline-none border-b-2 border-active resize-none w-full"
                      onChange={(e) => setValue(e.target.value)}
                      onInput={handleInput}
                    />
                  ) : (
                    <p>{value}</p>
                  )}
                </div>
              </div>
              <div>
                {editDesc ? (
                  <IoCheckmark
                    onClick={() => {
                      setEditDesc(false);
                    }}
                    className="hover:cursor-pointer text-xl"
                  />
                ) : (
                  <IoPencilOutline
                    onClick={() => {
                      setEditDesc(true);
                    }}
                    className="hover:cursor-pointer text-xl"
                  />
                )}
              </div>
            </div>
            <div className="text-gray-100 font-medium mt-3 text-lg flex items-center space-x-2">
              <AiOutlineMail className="text-gray-70 text-xl" />
              <p>jaggy@jay.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

function PreviewImage() {
  return (
    <div>
      <div></div>
    </div>
  );
}
