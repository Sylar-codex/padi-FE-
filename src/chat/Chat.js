import React, { useState, useEffect, useRef } from "react";
import useMessageState from "../hooks/messageHook";
import ChatPreview from "./ChatPreview";
import useAuthState from "../hooks/authHook";
import Messages from "../components/messages/Messages";
import OtherProfile from "../components/profile/OtherProfile";
import UserProfile from "../components/profile/UserProfile";

function Chat() {
  const [id, setId] = useState(0);
  const [openUserProfile, setOpenUserProfile] = useState(false);

  const [otherUserProfile, setOtherUserprofile] = useState(false);

  const { auth, loadActiveConversations } = useAuthState();
  const { user } = auth;

  useEffect(() => {
    console.log("online-users", messages.onlineUsers);
  }, []);

  const {
    isReady,
    messages,
    setConversationName,
    conversationName,
    getMessages,
    current,
    conversation,
  } = useMessageState();

  return (
    <div className="border border-gray-20 shadow-xl rounded-xl flex h-screen">
      <div className="w-2/5">
        {openUserProfile ? (
          <UserProfile setOpenUserProfile={setOpenUserProfile} />
        ) : (
          <ChatPreview
            id={id}
            setId={setId}
            setConversationName={setConversationName}
            setOpenUserProfile={setOpenUserProfile}
          />
        )}
      </div>
      <div className="w-3/5">
        {otherUserProfile ? (
          <OtherProfile setOtherUserprofile={setOtherUserprofile} />
        ) : (
          <Messages
            isReady={isReady}
            user={user}
            conversationName={conversationName}
            conversation={conversation}
            current={current}
            getMessages={getMessages}
            messages={messages}
            setOtherUserprofile={setOtherUserprofile}
          />
        )}
      </div>
    </div>
  );
}

export default Chat;
