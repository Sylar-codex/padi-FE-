import React, { useState, useEffect } from "react";
import { chatPreview } from "../data/messageData";
import coacheeProfile from "../assets/images/Avatar2.svg";
import Ravi from "../assets/contacts-img/Ravi.svg";
import Mia from "../assets/contacts-img/Mia.svg";
import Karen from "../assets/contacts-img/Karen.svg";
import paperAirplane from "../assets/icons/paper-airplane.svg";
import hourGlass from "../assets/icons/hour-glass.svg";
import pinkPlay from "../assets/icons/pink-play.svg";
import externalLink from "../assets/icons/external-link.svg";
import lockClosed from "../assets/icons/lock-closed.svg";
import useWebSocketHook from "../hooks/websocketHook";
import ChatPreview from "./ChatPreview";
import useAuthState from "../hooks/authHook";

function Chat() {
  const [id, setId] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [newConversation, setNewConversation] = useState(false);
  const { auth } = useAuthState();

  const { user } = auth;

  const [isReady, messages, setConversationName, conversationName, current] =
    useWebSocketHook();

  const formartTimeStamp = (timeStamp) => {
    const date = new Date(timeStamp);
    return date.toLocaleTimeString().slice(0, 5);
  };

  const handleSubmit = () => {
    if (messages.length === 0) {
      return;
    }
    if (isReady) {
      const dataObj = {
        type: "chat_message",
        message: newMessage,
      };
      const stringifyData = JSON.stringify(dataObj);
      current?.send(stringifyData);
    }
    setNewMessage("");
  };

  return (
    <div>
      <div>
        <div className="border border-gray-20 shadow-xl rounded-xl flex mt-6 h-screen">
          {/* chat preview */}
          <ChatPreview
            id={id}
            setId={setId}
            setConversationName={setConversationName}
          />
          {/* messages */}
          <div className="w-3/5">
            {conversationName.length > 0 ? (
              <div className="relative h-full bg-gray-5 ">
                <div className="flex border-b border-gray-20 items-center justify-between p-3 bg-white ">
                  <div className="flex space-x-2">
                    <div>
                      <img src={Ravi} alt="avatar" />
                    </div>
                    <div>
                      <p className="text-gray-100 font-semibold">Ravi Patel</p>
                      <p className="text-gray-90 text-sm">
                        Next session: 24 Jan, 2023 @ 9:30AM
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="rounded-full p-3 border border-gray-20 w-32 text-gray-90 text-center">
                      View Profile
                    </button>
                  </div>
                </div>
                <div className="bg-info-10 text-xs text-gray-90 p-4 font-semibold text-center mx-10 rounded-xl shadow-md mt-1 relative z-20">
                  <p>
                    This chat is only available for 2 days after your scheduled
                    session.
                  </p>
                </div>
                <div className="p-4 h-3/4 overflow-y-scroll">
                  {/* sender */}
                  {messages.messages.map((message) => (
                    <div
                      className={`flex ${
                        user?.username === message.from_user.username
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`w-2/3 flex ${
                          user?.username === message.from_user.username
                            ? "flex-row"
                            : "flex-row-reverse"
                        } justify-center items-center space-x-2`}
                      >
                        <div className="w-11/12">
                          <p
                            className={`${
                              user?.username === message.from_user.username
                                ? "bg-primary-50 py-3 px-5 text-gray-90 rounded-lg"
                                : "bg-gray-20 py-3 px-5 text-gray-90 rounded-lg"
                            }`}
                          >
                            {message.content}
                          </p>
                          <p className="flex gap-x-1 justify-end text-gray-70 text-xs mt-1">
                            {formartTimeStamp(message.timestamp)}
                          </p>
                        </div>
                        <div className="w w-1/12">
                          <img
                            className="w-full"
                            src={
                              user?.username === message.from_user.username
                                ? coacheeProfile
                                : Ravi
                            }
                            alt="avatar"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* send message input and button */}
                <div className="flex space-x-1 items-center w-full bg-white p-3 absolute bottom-0 right-0 z-20">
                  <div className="w-4/5 h-14">
                    <input
                      className="bg-gray-10 py-3 px-5 rounded-xl outline-none placeholder:text-gray-60 w-full h-full"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      type="text"
                      placeholder="Start a conversation!"
                    />
                  </div>
                  <div
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="flex space-x-px items-center hover:cursor-pointer justify-center bg-inactive text-white h-14 rounded-xl p-3 w-1/5"
                  >
                    <div>
                      <img src={paperAirplane} alt="paper-airplane" />
                    </div>
                    <p>Send</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-gray-5 h-full p-20 ">
                <div className="flex justify-center">
                  <img src={hourGlass} alt="hour-glass" />
                </div>
                <h2 className="text-gray-100 font-semibold mt-2">
                  Send a message to a contact
                </h2>
                <p className="text-gray-90 text-sm text-center mt-2 leading-6">
                  You can only chat with a contact you have sent a message to or
                  you have received message from
                </p>
                <button
                  // so this is the new plan...This button when clicked
                  // brings out a modal containing the users contact which would be used to select
                  // conversation name
                  onClick={() => {
                    setNewConversation(true);
                  }}
                  className="bg-active hover:cursor-pointer text-white rounded-full p-6 h-10 w-40 flex items-center justify-center mt-4"
                >
                  New Message
                </button>
              </div>
            )}
          </div>
          {/* end message */}
        </div>
      </div>
    </div>
  );
}

export default Chat;
