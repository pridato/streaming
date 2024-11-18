import React from "react";
import { motion } from "framer-motion";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { FcGoogle } from "react-icons/fc";

const LoginForm = ({
  errorMessage,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  handleGoogleLogin,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-8"
      >
        Iniciar Sesión
      </motion.h1>

      <form onSubmit={handleLogin} className="space-y-6">
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg"
          >
            {errorMessage}
          </motion.div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Usuario
          </label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-gray-800 
              text-gray-100 placeholder-gray-500
              focus:ring-2 focus:ring-purple-500 focus:border-transparent
              transition-all duration-300"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div className="space-y-2 relative">
          <label className="block text-sm font-medium text-gray-300">
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-gray-800 
              text-gray-100 placeholder-gray-500
              focus:ring-2 focus:ring-purple-500 focus:border-transparent
              transition-all duration-300"
            placeholder="Ingresa tu contraseña"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-300 transition-colors"
          >
            {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 
            text-white rounded-lg hover:from-purple-600 hover:to-pink-600 
            transition-all duration-300 shadow-lg shadow-purple-500/25 
            hover:shadow-purple-500/40"
        >
          Iniciar Sesión
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#111111] text-gray-500">
              O continúa con
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 
            bg-[#1a1a1a] border border-gray-800 rounded-lg
            hover:bg-[#222] transition-all duration-300"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-gray-300">Google</span>
        </button>

        <div className="mt-6 text-center space-y-2">
          <a
            href="/forgot-password"
            className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </a>
          <div className="text-gray-500">
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Regístrate
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
