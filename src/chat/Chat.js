import React, { useState, useEffect, useRef } from "react";
import useMessageState from "../hooks/messageHook";
import ChatPreview from "./ChatPreview";
import useAuthState from "../hooks/authHook";
import Messages from "../components/messages/Messages";
import OtherProfile from "../components/profile/OtherProfile";
import UserProfile from "../components/profile/UserProfile";
import NewConversation from "./NewConversation";
import useNotificationState from "../hooks/notificationHook";

function Chat() {
  const [id, setId] = useState(0);
  const [openUserProfile, setOpenUserProfile] = useState(false);

  const [otherUserProfile, setOtherUserprofile] = useState(false);

  const [chatComponent, setChatComponent] = useState();

  const [otherUser, setOtherUser] = useState([{}]);

  const { auth } = useAuthState();
  const { notification, loadActiveConversations } = useNotificationState();

  const { activeConversations } = notification;

  const { user, userProfile } = auth;

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
        {chatComponent === "user_profile" ? (
          <UserProfile
            setChatComponent={setChatComponent}
            user={user}
            userProfile={userProfile}
          />
        ) : chatComponent === "new_conversation" ? (
          <NewConversation
            setChatComponent={setChatComponent}
            setConversationName={setConversationName}
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
            setChatComponent={setChatComponent}
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
            otherUser={otherUser}
            loadActiveConversations={loadActiveConversations}
            setChatComponent={setChatComponent}
          />
        )}
      </div>
    </div>
  );
}

export default Chat;
