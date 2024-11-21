import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

/**
 * Obtiene o genera un identificador único del navegador
 * @returns {string} El ID único del navegador
 * @description
 * Esta función comprueba si existe una cookie con el ID del navegador.
 * Si no existe, genera un nuevo UUID y lo guarda en una cookie que expira en 365 días.
 * El ID del navegador se utiliza para identificar sesiones únicas de usuario.
 */
export function getBrowserId() {
  let browserId = Cookies.get("browserId");

  if (!browserId) {
    browserId = uuidv4();
    Cookies.set("browserId", browserId, { expires: 365 });
  }

  return browserId;
}
