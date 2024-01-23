import React, { useEffect } from "react";
import useAuthState from "../hooks/authHook";
import { Link } from "react-router-dom";

function DisplayChat() {
  const { auth, loadUsers } = useAuthState();
  const { user, users } = auth;
  // useEffect(() => {
  //   loadUsers();
  // }, []);
  useEffect(() => {
    console.log(auth);
  });
  const createConversation = (username) => {
    const nameByAlpha = [username, user.username].sort();
    return `${nameByAlpha[0]}__${nameByAlpha[1]}`;
  };
  return (
    <div>
      {/* {users
        .filter((allUsers) => user.username !== allUsers.username)
        .map((allUsers) => (
          <Link
            key={allUsers.username}
            to={`/chat/${createConversation(allUsers.username)}`}
          >
            <div>{allUsers.username}</div>
          </Link>
        ))} */}
    </div>
  );
}

export default DisplayChat;
