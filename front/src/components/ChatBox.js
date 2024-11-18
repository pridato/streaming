import useChatStore from "../context/chatStore";

/**
 * @fileoverview Componente ChatBox que implementa una interfaz de chat con un bot
 * @module ChatBox
 */

import React, { useState } from "react";
import { IconArrowsDiagonalMinimize2, IconSend } from "@tabler/icons-react";
import Message from "./message";
import { getChatBotResponse } from "../services/chatBotService";
import { showToast } from "../services/toastService";
import { useToast } from "@chakra-ui/react";

/**
 * Componente que renderiza una ventana de chat con un bot
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.closeChat - Función para cerrar/minimizar el chat
 * @returns {JSX.Element} Ventana de chat
 */
const ChatBox = ({ closeChat }) => {
  const toast = useToast();
  const [message, setMessage] = useState("");

  const messages = useChatStore((state) => state.messages);
  const isLoading = useChatStore((state) => state.isLoading);
  const addMessage = useChatStore((state) => state.addMessage);
  const setLoading = useChatStore((state) => state.setLoading);
  const loadMessages = useChatStore((state) => state.loadMessages);
  React.useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  /**
   * Maneja el cambio de texto en el campo de mensaje
   * @param {Object} e - Evento de cambio
   */
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  /**
   * Maneja el evento de presionar una tecla en el campo de mensaje
   * @param {Object} e - Evento de teclado
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Envía el mensaje al bot y procesa su respuesta
   * @async
   * @function
   */
  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;

    setLoading(true);
    try {
      // Agregar mensaje del usuario
      addMessage({ sender: "user", text: trimmedMessage });

      // Obtener respuesta del bot
      const response = await getChatBotResponse(trimmedMessage);

      // Agregar respuesta del bot
      addMessage({ sender: "bot", text: response });

      setMessage("");
    } catch (e) {
      console.error(e);
      showToast({
        title: "Error",
        description: e.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        toast,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-5 w-72 h-96 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
      <div className="flex flex-col h-full">
        {/* Botón de cerrar (minimizar) el chat */}
        <button
          onClick={closeChat}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <IconArrowsDiagonalMinimize2 stroke={2} />
        </button>

        {/* Área de mensajes */}
        <div className="mt-6 flex-grow overflow-y-auto p-2 mb-2">
          {messages.map((msg, index) => (
            <Message key={index} sender={msg.sender} text={msg.text} />
          ))}
        </div>

        {/* Campo de texto y botón de enviar */}
        <div className="flex items-center mt-2 border border-gray-300 rounded-3xl px-3 py-1">
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyPress}
            placeholder="Escribe un mensaje..."
            className="p-2 w-full rounded-md focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-full disabled:opacity-50"
            disabled={isLoading}
          >
            <IconSend stroke={1.5} width={25} height={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
