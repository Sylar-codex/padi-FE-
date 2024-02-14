import React from "react";
import avatar from "../../assets/contacts-img/Ravi.svg";
import { FaTrash, FaXmark } from "react-icons/fa6";
import { AiOutlineExclamationCircle, AiOutlineMail } from "react-icons/ai";

function OtherProfile({ setOtherUserprofile }) {
  return (
    <div className="h-full w-full">
      <div className="bg-gray-20">
        <div className="flex space-x-7 p-4 shadow-sm border border-gray-10 bg-white">
          <FaXmark
            className="hover:cursor-pointer text-2xl"
            onClick={() => {
              setOtherUserprofile(false);
            }}
          />
          <h3 className="text-gray-80 text-xl">User Info</h3>
        </div>
        {/* Avatar and username/name */}
        <div className="flex justify-center bg-white p-7">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full">
              <img className="w-full" src={avatar} alt="" />
            </div>
            <p className="text-gray-100 mt-2 font-bold text-lg">Love</p>
            <p className="text-gray-70">jaggy@jay.com</p>
          </div>
        </div>
        <div className="py-5 px-7 mt-3 bg-white cursor-default  text-gray-90">
          <h3 className="text-gray-80 text-lg">About</h3>
          <p className="mt-1">Hello I am using the Padi app</p>
        </div>
        {/* delete chat */}
        <div className="border border-gray-10 p-5 flex items-center space-x-2 text-error-50 hover:cursor-pointer hover:opacity-70 bg-white mt-3">
          <FaTrash className="" />
          <p>Delete Chat</p>
        </div>
      </div>
    </div>
  );
}

export default OtherProfile;
