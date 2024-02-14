import React, { useEffect, useState } from "react";
import { chatPreview } from "../data/messageData";
import avatar from "../assets/contacts-img/Ravi.svg";
import useAuthState from "../hooks/authHook";
import { formartTimeStamp } from "../utilities/formartTimeStamp";
import { createConversation } from "../utilities/createConversation";
import useNotificationState from "../hooks/notificationHook";
import { BsThreeDotsVertical } from "react-icons/bs";

// This is a component to display active users i.e users
// you have been in communications with recently

function ChatPreview({ id, setId, setConversationName, setOpenUserProfile }) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const { auth, loadActiveConversations, activeConversations } = useAuthState();
  const { user, users } = auth;
  const { notification } = useNotificationState();

  useEffect(() => {
    loadActiveConversations();
  }, []);
  useEffect(() => {
    console.log("notification", notification);
  }, [notification]);
  return (
    <div className="w-full h-full sticky top-0 z-10">
      <div className="flex justify-between p-3">
        <div className="flex items-center space-x-3">
          <h2 className="text-grray-100 font-semibold">Active Contacts</h2>
          <p className="w-5 h-5 p-4 rounded-full text-gray-70 flex items-center justify-center bg-gray-10">
            {activeConversations.length}
          </p>
        </div>
        <div className="relative">
          <div
            onClick={() => {
              setOpenDropDown((prev) => !prev);
            }}
            className="border border-gray-40 rounded-full h-7 w-7 p-1 flex justify-center items-center hover:cursor-pointer"
          >
            <BsThreeDotsVertical />
          </div>
          {openDropDown && (
            <DropDown
              setOpenDropDown={setOpenDropDown}
              setOpenUserProfile={setOpenUserProfile}
            />
          )}
        </div>
      </div>
      {/* need to make this fixed when it is at the top of the page the element below it need to be scrollable as well */}
      <div className="bg-gray-10 text-gray-80 p-3 text-sm">
        <p>
          The chats here are from only people you have been in communication
          with recently
        </p>
      </div>
      {activeConversations.length < 1 && (
        <div className="py-20 px-10 border-r-2 border-gray-5 text-center pb-96">
          <h2 className="text-gray-100 font-medium">No chats</h2>
          <p className="text-gray-90 mt-2 text-sm">
            Whenever you send a message to any of your contact, It'll appear
            here
          </p>
        </div>
      )}
      <div className="py-3 px-2 border-r-2 border-gray-5">
        {user &&
          activeConversations.map((converse, i) => (
            <div
              onClick={() => {
                setConversationName(
                  createConversation(converse.other_user.username, user)
                );
                setId(converse.id);
              }}
              className={`flex justify-between border-b-2 border-gray-5 rounded-xl py-3 px-2 ${
                id === converse.id ? "bg-gray-20" : "bg-white"
              } hover:cursor-pointer`}
              key={i}
            >
              <div className="flex space-x-4">
                <div className="w-16">
                  <img className="w-full" src={avatar} alt="avatar" />
                </div>

                <div className="flex flex-col">
                  <p className="text-gray-100 font-semibold">
                    {converse.other_user?.username}
                  </p>
                  <p className="text-gray-70 text-sm mt-2">
                    {converse.last_message?.content.length < 30
                      ? converse.last_message?.content
                      : converse.last_message?.content.substring(0, 30) + "..."}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <p className="text-xs text-gray-70">
                  {formartTimeStamp(converse.last_message?.timestamp)}
                </p>
                {converse.unread_count > 0 && (
                  <p className="flex items-center justify-center w-5 h-5 rounded-full p-1 bg-active text-white">
                    {converse.unread_count}
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChatPreview;

function DropDown({ setOpenDropDown, setOpenUserProfile }) {
  return (
    <div className="absolute top-9 -left-20 w-32 hover:cursor-pointer rounded-xl border-gray-40 shadow-lg text-gray-90 z-50 bg-white py-2 px-3 space-y-2">
      <div
        onClick={() => {
          setOpenDropDown(false);
          setOpenUserProfile(true);
        }}
      >
        <p>Profile</p>
      </div>
      <div
        onClick={() => {
          setOpenDropDown(false);
        }}
      >
        <p className="text-error-50"> Logout</p>
      </div>
    </div>
  );
}
