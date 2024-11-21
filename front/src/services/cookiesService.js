import Cookies from "js-cookie";

/**
 * Obtiene el valor de una cookie por su nombre
 * @param {string} name - Nombre de la cookie a obtener
 * @returns {string|undefined} Valor de la cookie o undefined si no existe
 */
export const getCookie = (name) => {
  return Cookies.get(name);
};

/**
 * Establece una nueva cookie con el nombre y valor especificados
 * @param {string} name - Nombre de la cookie
 * @param {string} value - Valor a almacenar en la cookie
 * @param {Object} options - Opciones adicionales para la cookie (ej: expires, path, domain)
 */
export const setCookie = (name, value, options = {}) => {
  Cookies.set(name, value, options);
};

/**
 * Elimina una cookie por su nombre
 * @param {string} name - Nombre de la cookie a eliminar
 */
export const removeCookie = (name) => {
  Cookies.remove(name);
};
