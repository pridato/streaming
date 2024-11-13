import React, { useState } from "react";
import { IconArrowsDiagonalMinimize2, IconSend } from "@tabler/icons-react";
import Message from "./message";

const ChatBox = ({ closeChat }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "¡Hola! ¿Cómo puedo ayudarte hoy?" },
  ]);

  /**
   * Funcion para manejar el cambio de texto en el campo de mensaje
   * @param {*} e Evento de cambio de texto
   */
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  /**
   * Función para enviar un mensaje y obtener una respuesta del bot
   */
  const handleSendMessage = () => {};

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
            placeholder="Escribe un mensaje..."
            className="p-2 w-full rounded-md focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-full"
          >
            <IconSend stroke={1.5} width={25} height={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
