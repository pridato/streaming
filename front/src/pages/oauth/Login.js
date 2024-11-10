import React from "react";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

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
  const handleLogin = (e) => {
    console.log(username, password);
    e.preventDefault();
  };

  return (
    <div className="flex h-screen">
      {/* Sección de la Imagen */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src="/assets/login_image.jpg"
          alt="Login Visual"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Sección del Formulario de Login */}
      <div className="w-1/2 flex items-center justify-center">
        <LoginForm
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
