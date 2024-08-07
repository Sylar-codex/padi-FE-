import React, { useEffect, useState } from "react";
import { formartTimeStamp } from "../utilities/formartTimeStamp";
import { createConversation } from "../utilities/createConversation";
import { BsThreeDotsVertical } from "react-icons/bs";
import userProfilePicDefault from "../assets/icons/user_profile.svg";

// This is a component to display active users i.e users
// you have been in communications with recently

function ChatPreview({
  id,
  setId,
  setConversationName,
  setChatComponent,
  user,
  loadActiveConversations,
  activeConversations,
  setOtherUser,
  logout,
  setPage,
  setIsChatOpen,
}) {
  const [openDropDown, setOpenDropDown] = useState(false);

  useEffect(() => {
    loadActiveConversations();
  }, []);
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
              setChatComponent={setChatComponent}
              logout={logout}
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
                setOtherUser([
                  converse.other_user,
                  converse.other_user_profile,
                ]);
                setPage(2);
                setId(converse.id);
                setIsChatOpen(true);
              }}
              className={`flex justify-between border-b-2 border-gray-5 rounded-xl py-3 px-2 ${
                id === converse.id ? "bg-gray-20" : "bg-white"
              } hover:cursor-pointer`}
              key={i}
            >
              <div className="flex space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                  <img
                    className="w-full  h-full object-cover rounded-full"
                    src={
                      converse.other_user_profile?.image
                        ? converse.other_user_profile?.image
                        : userProfilePicDefault
                    }
                    alt="avatar"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="text-gray-100 font-semibold">
                    {converse.other_user?.username}
                  </p>
                  <p className="text-gray-70 text-sm mt-2">
                    {converse.last_message
                      ? converse.last_message?.content.length < 30
                        ? converse.last_message?.content
                        : converse.last_message?.content.substring(0, 30) +
                          "..."
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <p
                  className={`text-sm ${
                    converse.unread_count > 0 ? "text-active" : "text-gray-70"
                  }`}
                >
                  {converse.last_message
                    ? formartTimeStamp(converse.last_message?.timestamp).split(
                        " "
                      )[0]
                    : ""}
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

// drop down
function DropDown({ setOpenDropDown, setChatComponent, logout }) {
  return (
    <div className="absolute top-9 -left-20 w-32 hover:cursor-pointer rounded-xl border-gray-40 shadow-lg text-gray-90 z-50 bg-white">
      <div
        className="hover:cursor-pointer py-2 px-3 hover:bg-gray-20 rounded-t-xl"
        onClick={() => {
          setOpenDropDown(false);
          setChatComponent("user_profile");
        }}
      >
        <p>Profile</p>
      </div>
      <div
        className="hover:cursor-pointer py-2 px-3 hover:bg-gray-20"
        onClick={() => {
          setOpenDropDown(false);
          setChatComponent("new_conversation");
        }}
      >
        <p>New Chat</p>
      </div>
      <div
        className="hover:cursor-pointer py-2 px-3 hover:bg-gray-20 rounded-b-xl"
        onClick={() => {
          setOpenDropDown(false);
          logout();
        }}
      >
        <p className="text-error-50"> Logout</p>
      </div>
    </div>
  );
}
