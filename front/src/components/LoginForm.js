import React from "react";
import InputField from "./InputField";
import Button from "./buttons/Button";
import GoogleButton from "./buttons/googleButton";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const LoginForm = ({
  errorMessage,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  /**
   * Funcion para alternar entre mostrar y ocultar la contraseña
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md w-full p-8 bg-white shadow-lg border border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Login
      </h1>
      <GoogleButton />
      <form className="space-y-4">
        {errorMessage && (
          <div className="text-red-500 text-sm text-center">{errorMessage}</div>
        )}
        <InputField
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
        />
        <div className="relative">
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 top-3 right-3 flex items-center justify-center text-gray-500 h-full"
          >
            {showPassword ? <IconEyeOff size={30} /> : <IconEye size={30} />}
          </button>
        </div>

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
