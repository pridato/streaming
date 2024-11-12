import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

/**
 * Funcion para generar un id único para el navegador
 * @returns una cookie con el id del navegador
 */
export function getBrowserId() {
  let browserId = Cookies.get("browserId");

  if (!browserId) {
    browserId = uuidv4();
    Cookies.set("browserId", browserId, { expires: 365 });
  }

  return browserId;
}
