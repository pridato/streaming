import axios from "axios";
import { API_URL, STRIPE_URL } from "../globals/globals";
import { getBrowserId } from "./utils";
import { getCookie } from "./cookiesService";

/**
 * Funcion para manejar el login y enviarlo al oauth para que este lo valide
 * @param {*} username usuario a loguear
 * @param {*} password contraseña del usuario sin encriptar
 * @returns respuesta del microservicio oauth
 */
export const authenticateUser = async (username, password) => {
  const browserIds = getBrowserId();

  const response = await axios.get(`${API_URL}/oauth/login`, {
    params: {
      username,
      password,
      grant_type: "password",
    },
    headers: {
      "browser-id": browserIds,
    },
  });
  return response.data;
};

export function getUserData() {
  // obtener cookie UserAccessToken
  const cookie = getCookie("UserAccessToken");
  console.log(cookie);
  return cookie;
}

/**
 * Obtiene el token de acceso del usuario actual
 * @returns {Promise<Object>} Datos del token de acceso del usuario
 * @throws {Error} Si ocurre un error en la petición o la respuesta no es válida
 * @description
 * Esta función realiza una petición al servidor de autenticación para obtener
 * el token de acceso del usuario actual. Incluye el ID del navegador en los
 * headers para identificar la sesión.
 */
export async function getUserAccessToken() {
  const response = await axios.get(
    `${STRIPE_URL}/oauth/get-user-access-token`,
    {
      headers: {
        "browser-id": getBrowserId(),
      },
    }
  );
  return response.data;
}

/**
 * Función para autenticar un usuario con google
 * @returns String url a redirigir
 */
export const getGoogleUrl = async () => {
  const browserIds = getBrowserId();
  const response = await axios.get(`${API_URL}/oauth/get-google-redirect-url`, {
    headers: {
      "browser-id": browserIds,
    },
  });
  return response.data;
};
