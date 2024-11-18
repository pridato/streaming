import React, { useState } from "react";
import { IconArrowsDiagonalMinimize2, IconSend } from "@tabler/icons-react";
import Message from "./message";
import { getChatBotResponse } from "../services/chatBotService";
import { showToast } from "../services/toastService";
import { useToast } from "@chakra-ui/react";

const INITIAL_MESSAGE = {
  sender: "bot",
  text: "¡Hola! ¿Cómo puedo ayudarte hoy?",
};

const ChatBox = ({ closeChat }) => {
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Funcion para manejar el cambio de texto en el campo de mensaje
   * @param {*} e Evento de cambio de texto
   */
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Función para enviar un mensaje y obtener una respuesta del bot
   */
  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;

    setIsLoading(true);
    try {
      // Se actualiza el estado de los mensajes en un solo paso
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: trimmedMessage },
      ]);

      // Obtenemos la respuesta del bot
      const response = await getChatBotResponse(trimmedMessage);

      // Actualizamos el estado con la respuesta del bot
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: response },
      ]);

      // Limpiar el campo de mensaje después de enviar
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
      setIsLoading(false);
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
            onKeyPress={handleKeyPress}
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
