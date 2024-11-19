import React from "react";
import LoginForm from "../../components/common/forms/LoginForm";
import { authenticateUser, getGoogleUrl } from "../../services/oauthService";
import { useToast } from "@chakra-ui/react";
import { showToast } from "../../services/toastService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const toast = useToast();
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  /**
   * funcion para manejar el cambio del usuario al escribir en el campo de usuario
   * @param {*} e evento input del campo de usuario
   */
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  /**
   * funcion para manejar el cambio de la contraseña al escribir en el campo de contraseña
   * @param {*} e evento input del campo de contraseña
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * funcion para manejar el inicio de sesión, contrastar usuario y contraseña contra spring
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Usuario y contraseña son requeridos");
    } else {
      try {
        const response = await authenticateUser(username, password);
        // TODO guardar el response en una cookie para guardar la sesion en un authContext
        console.log(response);
        navigate("/");
      } catch (error) {
        console.error(error);
        showToast({
          title: "Error",
          description: "Usuario o contraseña incorrectos",
          status: "error",
          duration: 9000,
          isClosable: true,
          toast,
        });
      }
    }
  };

  /**
   * Funcion para manejar el inicio de sesión con Google, generra url de redireccionamiento a Google
   */
  const handleGoogleLogin = () => {
    getGoogleUrl()
      .then((response) => {
        window.location.href = response.url;
      })
      .catch((error) => {
        showToast({
          title: "Error",
          description: "No se pudo iniciar sesión con Google",
          status: "error",
          duration: 9000,
          isClosable: true,
          toast,
        });
      });
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl h-[600px] flex rounded-2xl overflow-hidden shadow-2xl bg-[#111111] border border-gray-800 relative z-10"
      >
        {/* Sección de la Ilustración */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <img
            src="/assets/modern_illustration.svg"
            alt="Login Visual"
            className="absolute inset-0 w-full h-full object-contain p-12 animate-float"
          />
        </motion.div>

        {/* Sección del Formulario */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full lg:w-1/2 p-8 sm:p-12 bg-[#111111]"
        >
          <LoginForm
            errorMessage={errorMessage}
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleLogin={handleLogin}
            handleGoogleLogin={handleGoogleLogin}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
