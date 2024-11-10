import React from "react";
import InputField from "./InputField";
import Button from "./button";

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
}) => {
  return (
    <div className="max-w-md w-full p-8 bg-white shadow-lg border border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Login
      </h1>
      <form className="space-y-4">
        <InputField
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
        <Button text="Log In" onClick={handleLogin} />
        <div className="text-center">
          <a href="/" className="text-[#6836D7] hover:underline block">
            Forgot your password?
          </a>
          <a href="/" className="text-[#6836D7] hover:underline block">
            Create an account
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
