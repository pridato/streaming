/**
 * @fileoverview Store de Zustand para manejar el estado del chat
 * @module chatStore
 */

import { create } from "zustand";

/**
 * Mensaje inicial que muestra el bot al cargar
 * @constant {Object}
 * @property {string} sender - Indica que el remitente es el bot
 * @property {string} text - Texto del mensaje inicial
 */
const INITIAL_MESSAGE = {
  sender: "bot",
  text: "¡Hola! ¿Cómo puedo ayudarte hoy?",
};

/**
 * Store de Zustand para manejar el estado del chat
 * @function
 * @param {Function} set - Función para actualizar el estado
 * @returns {Object} Objeto con el estado y métodos del store
 */
const useChatStore = create((set, get) => ({
  /** @property {Array} messages - Lista de mensajes del chat */
  messages: [INITIAL_MESSAGE],
  /** @property {boolean} isLoading - Indica si se está procesando un mensaje */
  isLoading: false,

  /**
   * Carga los mensajes guardados en localStorage
   * @function
   * @returns {void}
   */
  loadMessages: () => {
    // devolver los mensajes del store que no sean vacíos
    return get().messages.filter((message) => message.text !== "");
  },

  /**
   * Agrega un nuevo mensaje al chat
   * @param {Object} message - Mensaje a agregar
   */
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  /**
   * Actualiza el estado de carga
   * @param {boolean} loading - Nuevo estado de carga
   */
  setLoading: (loading) => set({ isLoading: loading }),

  /**
   * Limpia todos los mensajes y restaura el mensaje inicial
   */
  clearMessages: () => set({ messages: [INITIAL_MESSAGE] }),
}));

export default useChatStore;
