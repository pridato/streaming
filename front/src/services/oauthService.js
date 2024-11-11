import axios from "axios";
import { API_URL } from "../globals/globals";

/**
 * Funcion para manejar el login y enviarlo al oauth para que este lo valide
 * @param {*} username usuario a loguear
 * @param {*} password contraseña del usuario sin encriptar
 * @returns respuesta del microservicio oauth
 */
export const authenticateUser = async (username, password) => {
  const response = await axios.get(`${API_URL}/oauth/login`, {
    params: {
      username,
      password,
      grant_type: "password",
    },
  });
  return response.data;
};

/**
 * Función para autenticar un usuario con google
 * @returns String url a redirigir
 */
export const getGoogleUrl = async () => {
  const response = await axios.get(`${API_URL}/oauth/get-google-redirect-url`);
  return response.data;
};
