import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { returnError, createMessageAlert } from "../actions/messages";
import { handleApiCall, handleApiCallFormData } from "../services/httpConfig";
import {
  AUTH_ERROR,
  FORM_SUBMISSION,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USERS_LOADED,
  USERS_LOADING,
  USER_LOADED,
  USER_LOADING,
  USER_PROFILE_LOADED,
  USER_PROFILE_LOADING,
} from "../actions/type";
import { MessageAlertContext } from "../contexts/MessageAlertContext";

const useAuthState = () => {
  const { auth, dispatchAuth } = useContext(AuthContext);
  const { dispatchError } = useContext(ErrorContext);
  const { dispatchMessageAlert } = useContext(MessageAlertContext);

  // Register new user
  const register = async (payload) => {
    dispatchAuth({ type: FORM_SUBMISSION });

    payload = JSON.stringify(payload);
    try {
      const response = await handleApiCall(
        "api/auth/register",
        "POST",
        payload
      );
      dispatchAuth({ type: REGISTER_SUCCESS, payload: response.data });
    } catch (err) {
      dispatchAuth({ type: REGISTER_FAIL });
      dispatchError(returnError(err.response.data, err.response.status));
    }
  };

  // login existing user
  const login = async (payload) => {
    try {
      dispatchAuth({ type: USER_LOADING });
      dispatchAuth({ type: FORM_SUBMISSION });

      const response = await handleApiCall("api/auth/login", "POST", payload);
      dispatchAuth({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (err) {
      dispatchAuth({ type: LOGIN_FAIL });
      dispatchError(returnError(err.response.data, err.response.status));
    }
  };

  // logout user
  const logout = async () => {
    try {
      const response = await handleApiCall("api/auth/logout", "POST", null);
      dispatchAuth({ type: LOGOUT_SUCCESS });
    } catch (err) {
      dispatchError(returnError(err.response.data, err.response.status));
    }
  };
  //  get logged in user
  const loadUser = async () => {
    try {
      dispatchAuth({ type: USER_LOADING });
      const response = await handleApiCall("api/auth/user", "GET");
      dispatchAuth({ type: USER_LOADED, payload: response.data });
    } catch (err) {
      dispatchAuth({ type: AUTH_ERROR });
      console.log(err);
    }
  };

  // get user profile
  const loadUserProfile = async () => {
    try {
      dispatchAuth({ type: USER_PROFILE_LOADING });
      const response = await handleApiCall("api/get/user_profile", "GET");
      dispatchAuth({ type: USER_PROFILE_LOADED, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  // update user profile
  const updateUserProfile = async (payload, id) => {
    const alertData = () => {
      if (payload.description) {
        return "Updated About";
      }
      if (payload.image) {
        return "Uploaded Profile Picture";
      }
      if (payload.remove_image) {
        return "Removed Profile Picture";
      }
    };
    try {
      const response = await handleApiCallFormData(
        `api/update/user_profile/${id}/`,
        "PATCH",
        payload
      );
      dispatchAuth({ type: USER_PROFILE_LOADED, payload: response.data });
      dispatchMessageAlert(createMessageAlert({ updateProfile: alertData() }));
    } catch (err) {
      console.log(err);
    }
  };

  // get all users
  const loadUsers = async () => {
    try {
      dispatchAuth({ type: USERS_LOADING });
      const response = await handleApiCall("api/auth/get_all_users", "GET");
      dispatchAuth({ type: USERS_LOADED, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    auth,
    register,
    login,
    logout,
    loadUser,
    loadUsers,
    loadUserProfile,
    updateUserProfile,
  };
};

export default useAuthState;
