import React from "react";

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
        {/* Contenedor flotante para el formulario */}
        <div className="max-w-md w-full p-8 bg-white shadow-lg border border-gray-200 rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h1>
          <form className="space-y-4">
            {/* Campo de entrada para el nombre de usuario */}
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                onChange={handleUsernameChange}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8459CC]"
                placeholder="Enter your username"
              />
            </div>
            {/* Campo de entrada para la contraseña */}
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                onChange={handlePasswordChange}
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8459CC]"
                placeholder="Enter your password"
              />
            </div>
            {/* Botón de inicio de sesión */}
            <button
              onClick={handleLogin}
              type="submit"
              className="w-full bg-[#6836D7] text-white py-2 rounded-lg hover:bg-[#B08FF5] transition duration-300"
            >
              Log In
            </button>
            {/* Enlaces para recuperar la contraseña y crear una cuenta */}
            <div className="">
              <a
                href="/"
                className="text-[#6836D7] hover:underline block text-center"
              >
                Forgot your password?
              </a>
              <a
                href="/"
                className="text-[#6836D7] hover:underline block text-center"
              >
                Create an account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
