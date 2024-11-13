import React, { useState } from "react";
import ChatBox from "../ChatBox";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el estado del chat
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {!isOpen && (
        <div className="relative">
          {/* El botón flotante */}
          <button
            onClick={toggleChat}
            className={`fixed bottom-5 right-5 bg-blue-500 text-white rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen ? "w-16 h-16" : "w-12 h-12"
            }`}
          >
            <span className="text-2xl">{isOpen ? "❌" : "💬"}</span>
            {/* El ícono cambia cuando se abre */}
          </button>

          {/* Mostrar el chat si está abierto */}
        </div>
      )}
      {isOpen && <ChatBox closeChat={toggleChat} />}
    </div>
  );
};

export default ChatButton;
