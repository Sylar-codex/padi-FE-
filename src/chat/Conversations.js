import React, { useEffect } from "react";
import { chatPreview } from "../data/messageData";
import avatar from "../assets/contacts-img/Ravi.svg";
import useAuthState from "../hooks/authHook";
import { createConversation } from "../utilities/createConversation";
import useWebSocketHook from "../hooks/websocketHook";
import { useNavigate } from "react-router-dom";

// Where users can search or get users to have conversation with
function Conversations() {
  const { auth, loadUsers } = useAuthState();
  const { setConversationName } = useWebSocketHook();
  const { user, users } = auth;

  const navigate = useNavigate();
  useEffect(() => {
    loadUsers();
  }, []);

  const otherUsers = users.filter((otherUser) => {
    return user?.username !== otherUser.username;
  });

  return (
    <div className="w-2/5 h-full sticky top-0 z-10">
      <div className="flex items-center space-x-3 p-3">
        <h2 className="text-grray-100 font-semibold">Active Contacts</h2>
        <p className="w-5 h-5 p-4 rounded-full text-gray-70 flex items-center justify-center bg-gray-10">
          {chatPreview.length}
        </p>
      </div>
      {/* need to make this fixed when it is at the top of the page the element below it need to be scrollable as well */}
      <div className="bg-gray-10 text-gray-80 p-3 text-sm">
        <p>
          The chats here are from only people you have been in communication
          with recently
        </p>
      </div>
      {otherUsers.length < 1 && (
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
          otherUsers.map((otherUser, i) => (
            <div
              onClick={() => {
                setConversationName(
                  createConversation(otherUser.username, user)
                );
                navigate("/chat");
              }}
              className={`flex space-x-3 border-b-2 border-gray-5 rounded-xl py-3 px-2 "bg-white"
               hover:cursor-pointer`}
              key={i}
            >
              <div className="w-20">
                <img className="w-full" src={avatar} alt="avatar" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-100 font-semibold">
                    {otherUser.username}
                  </p>
                  <p className="text-xs text-gray-70">12 hours ago</p>
                </div>
                <p className="text-gray-70 text-sm mt-2">
                  Mia: I'm looking forward to it too. I believe in you and your
                  ability to m...
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Conversations;
