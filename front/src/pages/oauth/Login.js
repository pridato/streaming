import React from "react";
import LoginForm from "../../components/LoginForm";
import { authenticateUser } from "../../services/oauthService";
import { useToast } from "@chakra-ui/react";
import { showToast } from "../../services/toastService";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="flex h-screen">
      {/* Sección de la Imagen */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center relative">
        <img
          src="/assets/login_image.jpg"
          alt="Login Visual"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Sección del Formulario de Login */}
      <div className="w-1/2 flex items-center justify-center relative">
        {/* Este div también será cubierto por el overlay cuando 'loading' sea true */}
        <LoginForm
          errorMessage={errorMessage}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  );
};

export default Login;
