import React from "react";
import { Navigate } from "react-router-dom";
import useAuthState from "../hooks/authHook";

const HomeRedirect = () => {
  const { auth } = useAuthState();

  if (auth.isLoading) {
    return <h2>Loading...</h2>;
  } else {
    return <Navigate to="/chat" />;
  }
};

export default HomeRedirect;
