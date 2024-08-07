import React, { useState, useEffect, useRef } from "react";
import paperAirplane from "../../assets/icons/paper-airplane.svg";
import hourGlass from "../../assets/icons/hour-glass.svg";
import { formartTimeStamp } from "../../utilities/formartTimeStamp";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatLoader from "../utility-component/ChatLoader";
import { useHotkeys } from "react-hotkeys-hook";
import userProfilePicDefault from "../../assets/icons/user_profile.svg";
import { FaAngleLeft } from "react-icons/fa";

function Messages({
  isReady,
  messages,
  conversationName,
  getMessages,
  current,
  conversation,
  user,
  setOtherUserprofile,
  otherUser,
  loadActiveConversations,
  setChatComponent,
  setIsChatOpen,
}) {
  const [id, setId] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [newConversation, setNewConversation] = useState(false);
  const [meTyping, setMeTyping] = useState(false);
  const [typing, setTyping] = useState(false);

  const timeout = useRef();

  // timeout function
  const timeoutFunction = () => {
    setMeTyping(false);

    const dataObj = {
      type: "typing",
      typing: false,
    };
    const stringifyData = JSON.stringify(dataObj);
    current?.send(stringifyData);
  };

  const onType = () => {
    if (!meTyping) {
      setMeTyping(true);
      const dataObj = {
        type: "typing",
        typing: true,
      };
      const stringifyData = JSON.stringify(dataObj);
      current?.send(stringifyData);
      timeout.current = setTimeout(timeoutFunction, 5000);
    } else {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(timeoutFunction, 5000);
    }
  };

  useEffect(
    () => () => clearTimeout(timeout.current),

    []
  );

  // function to perform sending the message
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
      loadActiveConversations();
    }
    setNewMessage("");
    clearTimeout(timeout.current);
    timeoutFunction();
  };

  const inputRef = useHotkeys(
    "enter",
    () => {
      handleSubmit();
    },
    {
      enableOnTags: ["INPUT"],
    }
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  // handleMessage method, to handle change in the input
  const handleMessage = (e) => {
    setNewMessage(e.target.value);
    onType();
  };

  useEffect(() => {
    if (messages.typingEvent) {
      const updateTyping = () => {
        if (messages.typingEvent.user !== user?.username) {
          setTyping(messages.typingEvent.typing);
        }
      };
      updateTyping();
    }
  }, [messages.typingEvent, typing]);

  // if messaga has been read
  useEffect(() => {
    if (isReady) {
      const dataObj = {
        type: "read_messages",
      };
      const stringifyData = JSON.stringify(dataObj);
      current?.send(stringifyData);
    }
  }, [isReady]);

  return (
    <div className="h-full">
      {conversationName.length > 0 ? (
        <div className="relative h-full bg-gray-5 ">
          {conversation && (
            <div className="flex border-b border-gray-20 items-center justify-between p-3 bg-white ">
              <div className="flex space-x-2 items-center">
                <FaAngleLeft
                  onClick={() => {
                    setIsChatOpen(false);
                  }}
                  className={`text-xl hover:cursor-pointer lg:hidden block`}
                />
                <div className="w-12 h-12 rounded-full bg-gray-50">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={
                      otherUser[1]?.image
                        ? otherUser[1]?.image
                        : userProfilePicDefault
                    }
                    alt="avatar"
                  />
                </div>
                <div>
                  <p className="text-gray-100 font-semibold">
                    {conversation.other_user?.username}
                  </p>
                  {!typing ? (
                    <p className="text-gray-90 text-sm">
                      {messages.onlineUsers.includes(
                        conversation.other_user?.username
                      )
                        ? " online"
                        : "offline"}
                    </p>
                  ) : (
                    <p className="text-gray-90 text-sm italic">typing...</p>
                  )}
                </div>
              </div>
              <div
                onClick={() => {
                  setOtherUserprofile(true);
                }}
              >
                <button className="rounded-full p-3 border border-gray-20 w-32 text-gray-90 text-center">
                  View Profile
                </button>
              </div>
            </div>
          )}
          <div className="bg-info-10 text-xs text-gray-90 p-4 font-semibold text-center mx-10 rounded-xl shadow-md mt-1 relative z-20">
            <p>This Chat is Secured</p>
          </div>
          <div
            id="scrollableDiv"
            className={`p-4 h-3/4 overflow-y-auto  relative flex ${
              messages.messages.length >= 10 ? "flex-col-reverse" : "flex-col"
            }`}
          >
            <div>
              <InfiniteScroll
                dataLength={messages.messages.length}
                next={getMessages}
                className="flex flex-col-reverse" // To put endMessage and loader to the top
                inverse={true}
                hasMore={messages.hasMoreMessages}
                loader={<ChatLoader />}
                scrollableTarget="scrollableDiv"
              >
                {/* sender */}
                {messages.messages.map((message, ind) => (
                  <div
                    key={message.id}
                    className={`flex w-full overflow-x-hidden ${
                      ind != 0 && "mt-1"
                    } ${
                      user?.username === message.from_user?.username
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`w-4/5 flex ${
                        user?.username === message.from_user?.username
                          ? "flex-row"
                          : "flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`w-10/12 ${
                          user?.username === message.from_user?.username
                            ? "mr-2"
                            : "ml-2"
                        }`}
                      >
                        <p
                          className={`${
                            user?.username === message.from_user?.username
                              ? "bg-primary-50"
                              : "bg-gray-20"
                          } py-3 px-5 text-gray-90 rounded-lg`}
                        >
                          {message.content}
                        </p>
                        <p className="flex gap-x-1 justify-end text-gray-70 text-xs mt-1">
                          {formartTimeStamp(message.timestamp)}
                        </p>
                      </div>
                      <div className="w-2/12">
                        <div className="w-12 h-12 rounded-full bg-gray-50">
                          <img
                            className="w-full h-full rounded-full object-cover"
                            src={
                              message.from_user?.id ===
                              message.from_user_profile?.user
                                ? message.from_user_profile?.image
                                  ? message.from_user_profile?.image
                                  : userProfilePicDefault
                                : message.to_user_profile?.image
                                ? message.to_user_profile?.image
                                : userProfilePicDefault
                            }
                            alt="avatar"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </div>
          {/* send message input and button */}
          <div className="flex space-x-1 items-center w-full bg-white p-3 absolute bottom-0 right-0 z-20">
            <div className="w-4/5 h-14">
              <input
                className="bg-gray-10 py-3 px-5 rounded-xl outline-none placeholder:text-gray-60 w-full h-full"
                value={newMessage}
                onChange={handleMessage}
                type="text"
                placeholder="Start a conversation!"
                ref={inputRef}
              />
            </div>
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="flex space-x-px items-center hover:cursor-pointer justify-center bg-inactive text-white h-14 rounded-xl p-3 w-1/5"
            >
              <div>
                <img src={paperAirplane} alt="paper-airplane" />
              </div>
              <p>Send</p>
            </button>
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
            You can only chat with a contact you have sent a message to or you
            have received message from
          </p>
          <button
            // so this is the new plan...This button when clicked
            // brings out a modal containing the users contact which would be used to select
            // conversation name
            onClick={() => {
              setChatComponent("new_conversation");
              setNewConversation(true);
            }}
            className="bg-active hover:cursor-pointer text-white rounded-full p-6 h-10 w-40 flex items-center justify-center mt-4"
          >
            New Message
          </button>
        </div>
      )}
    </div>
  );
}

export default Messages;
