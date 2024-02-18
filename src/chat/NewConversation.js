import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import useAuthState from "../hooks/authHook";
import { createConversation } from "../utilities/createConversation";

function NewConversation({ setChatComponent, setConversationName }) {
  const [value, setValue] = useState("");
  const [lookedUpUsers, setLookedUpUsers] = useState([]);

  const { auth, loadUsers } = useAuthState();
  const { user, users } = auth;

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const filterUser = users.filter(
      (user) => value.toLowerCase() === user.email
    );
    console.log(filterUser);
    setLookedUpUsers(filterUser);
  }, [value]);

  return (
    <div className="w-full h-full sticky top-0 z-10">
      <div className="flex space-x-4 items-center text-xl text-white bg-active px-5 py-4">
        <FaArrowLeft
          onClick={() => {
            setChatComponent("");
          }}
          className="hover:cursor-pointer"
        />
        <p className="font-semibold">New Chat</p>
      </div>
      <div className="px-5">
        <div className="bg-gray-10 w-full mt-4 flex items-center space-x-3 px-5 h-12 rounded-xl">
          <FaArrowLeft className="text-gray-70" />
          <input
            className="w-full h-full bg-gray-10 outline-none"
            type="email"
            placeholder="Start a New Conversation"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <div>
        {lookedUpUsers.map((lookedUpUser) => (
          <div
            onClick={() => {
              setConversationName(
                createConversation(lookedUpUser.username, user)
              );
              setChatComponent("");
            }}
            className="bg-gray-10 w-44 mt-4 ml-5 p-3 rounded-xl hover:cursor-pointer"
            key={lookedUpUser.id}
          >
            <div className="text-gray-100">{lookedUpUser.username}</div>
            <div className="text-gray-70">{lookedUpUser.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewConversation;
