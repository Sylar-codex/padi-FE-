import React from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import PasswordField from "../inputs/PasswordField";
import useInputState from "../../hooks/inputHook";
import useAuthState from "../../hooks/authHook";

function PasswordInput() {
  const navigate = useNavigate();
  const [password, setPassword] = useInputState();
  const { login, auth } = useAuthState();

  const { username } = useParams();

  const handleSubmit = () => {
    if (password !== "") {
      login({ username, password });
    }
    if (auth.isAuthenticated) {
      navigate("/chat");
    }
  };
  return (
    <div>
      <div className="w-1/2 mx-auto">
        <div className="w-full p-3 h-14 border border-gray-30 rounded-lg my-3 cursor-text">
          {/* I will use session storage later */}
          <p>{username}</p>
        </div>
        <div className="space-y-3">
          <PasswordField
            name={"password"}
            id={"password"}
            placeHolder={"Password"}
            handleChange={setPassword}
            value={password || ""}
            label={"Password"}
            required={true}
          />
        </div>
        <Link
          to="/reset_password"
          className="flex justify-center text-active mt-1 text-sm"
        >
          Forgot password?
        </Link>
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => {
            navigate("/login/username");
          }}
          className="border border-gray-30 text-[#000000] rounded-lg w-1/2 h-14 p-3 flex justify-center items-center"
        >
          Back
        </button>
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

export default PasswordInput;
