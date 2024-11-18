import axios from "axios";

/**
 * Función para generar texto con ia
 * @param {*} prompt texto a mandar
 * @returns texto generado por la ia, puede devolver excepcion
 */
export const getChatBotResponse = async (prompt) => {
  try {
    const response = await axios.get(
      `http://localhost:5050/chat?prompt=${prompt}`
    );

    console.log(response.data.response);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
