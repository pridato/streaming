import axios from "axios";

/**
 * Función para generar texto con ia
 * @param {*} prompt texto a mandar
 * @returns texto generado por la ia, puede devolver excepcion
 */
export const getChatBotResponse = async (prompt) => {
  try {
    console.log("http://127.0.0.1:5050/chat-bot?prompt=" + prompt);
    const response = await axios.get(
      `http://127.0.0.1:5050/chat-bot?prompt=${prompt}`
    );

    console.log(response);
    if (response.data.response.error) {
      throw new Error(response.data.response.error);
    }
    return response.data?.response[0].generated_text;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
