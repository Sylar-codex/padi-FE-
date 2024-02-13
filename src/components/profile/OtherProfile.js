import React from "react";
import avatar from "../../assets/contacts-img/Ravi.svg";
import { FaTrash, FaXmark } from "react-icons/fa6";

function OtherProfile({ setOtherUserprofile }) {
  return (
    <div className="h-full w-full">
      <div>
        <div className="flex space-x-7 p-4 shadow-sm rounded-xl border border-gray-10">
          <FaXmark
            className="hover:cursor-pointer text-2xl"
            onClick={() => {
              setOtherUserprofile(false);
            }}
          />
          <h3 className="text-gray-80 text-xl">User Info</h3>
        </div>
        {/* Avatar and username/name */}
        <div className="flex justify-center mt-2">
          <div className="flex flex-col items-center">
            <div className="w-32">
              <img className="w-full" src={avatar} alt="" />
            </div>
            <p className="text-gray-100 mt-2 font-bold text-lg">Love</p>
          </div>
        </div>
        {/*about and email  */}
        <div className="py-5 px-7 mt-5 cursor-default">
          <h3 className="text-gray-80">About and Email</h3>
          <p className="text-gray-100 font-medium mt-3 text-lg">
            Hello I am using the Padi app
          </p>
          <p className="text-gray-100 text-lg font-medium mt-3">
            jaggy@jay.com
          </p>
        </div>
        {/* delete chat */}
        <div className="border border-gray-10 p-5 flex items-center space-x-2 text-error-50 hover:cursor-pointer hover:opacity-70">
          <FaTrash />
          <p>Delete Chat</p>
        </div>
      </div>
    </div>
  );
}

export default OtherProfile;
