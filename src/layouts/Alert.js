import React, { Fragment, useEffect, useContext, useCallback } from "react";
import { toast } from "react-toastify";
import { MessageAlertContext } from "../contexts/MessageAlertContext";
import { ErrorContext } from "../contexts/ErrorContext";

function Alert() {
  const { error } = useContext(ErrorContext);
  const { messageAlert } = useContext(MessageAlertContext);

  const notifyMessageAlert = useCallback(() => {
    if (messageAlert.passwordNotMatch)
      toast.error(messageAlert.passwordNotMatch);

    if (messageAlert.cannotBeBlank) toast.error(messageAlert.cannotBeBlank);
    if (messageAlert.updateProfile) toast.success(messageAlert.updateProfile);
  }, [
    messageAlert.passwordNotMatch,
    messageAlert.cannotBeBlank,
    messageAlert.updateProfile,
  ]);

  const notifyError = useCallback(() => {
    if (error.msg.email) {
      toast.error(`Email: ${error.msg.email.join()}`);
    }
    if (error.msg.message) {
      toast.error(`Message: ${error.msg.message.join()}`);
    }
    if (error.msg.non_field_errors) {
      toast.error(error.msg.non_field_errors.join());
    }
    if (error.msg.username) {
      toast.error(error.msg.username.join());
    }
  }, [
    error.msg.email,
    error.msg.message,
    error.msg.non_field_errors,
    error.msg.username,
  ]);

  useEffect(() => {
    notifyError();
  }, [error, notifyError]);

  useEffect(() => {
    notifyMessageAlert();
  }, [messageAlert, notifyMessageAlert]);
  return <Fragment />;
}

export default Alert;
