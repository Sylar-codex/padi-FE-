import React, { useContext } from "react";
import useinputState from "../../hooks/inputHook";
import { useNavigate } from "react-router-dom";
import InputField from "../inputs/InputField";
import { createMessageAlert } from "../../actions/messages";
import { MessageAlertContext } from "../../contexts/MessageAlertContext";

function UsernameInput() {
  const { dispatchMessageAlert } = useContext(MessageAlertContext);

  const [username, setUsername] = useinputState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username !== "") {
      navigate(`/login/password/${username}`);
    } else {
      dispatchMessageAlert(
        createMessageAlert({ cannotBeBlank: "This field cannot be blank" })
      );
    }
  };

  return (
    <div>
      <div className="w-1/2 mx-auto">
        {/* inputfield component */}
        <InputField
          name={"username"}
          id={"username"}
          type={"text"}
          placeHolder={"Your username"}
          handleChange={setUsername}
          value={username}
          label={"Your Username"}
          required={true}
        />
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="bg-active text-white rounded-lg w-1/2 h-14 p-3 flex justify-center items-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default UsernameInput;
