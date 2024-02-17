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

  const [otherUser, setOtherUser] = useState([{}]);

  const { auth, loadActiveConversations, activeConversations } = useAuthState();

  const { user, userProfile } = auth;

  useEffect(() => {
    console.log("online-users", messages.onlineUsers);
    userProfile && console.log("userProfile", userProfile);
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
          <UserProfile
            setOpenUserProfile={setOpenUserProfile}
            user={user}
            userProfile={userProfile}
          />
        ) : (
          <ChatPreview
            id={id}
            setId={setId}
            setConversationName={setConversationName}
            setOpenUserProfile={setOpenUserProfile}
            user={user}
            loadActiveConversations={loadActiveConversations}
            activeConversations={activeConversations}
            setOtherUser={setOtherUser}
          />
        )}
      </div>
      <div className="w-3/5">
        {otherUserProfile ? (
          <OtherProfile
            setOtherUserprofile={setOtherUserprofile}
            otherUser={otherUser}
          />
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
