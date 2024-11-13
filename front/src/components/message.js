import React from "react";

const Message = ({ sender, text }) => {
  const isBot = sender === "bot";

  return (
    <div className={`flex ${isBot ? "items-start" : "items-end"} mb-2`}>
      {isBot && (
        <img
          src="/assets/bot.png" // Avatar del bot
          alt="Bot Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
      )}

      <div
        className={`relative max-w-xs p-3 rounded-lg ${
          isBot ? "bg-gray-100 text-gray-700" : "bg-blue-500 text-white"
        }`}
      >
        <p>{text}</p>

        {/* Triángulo orientado al origen (bot o usuario) */}
        <div
          className={`absolute ${
            isBot
              ? "left-[-8px] top-1/2 transform -translate-y-1/2"
              : "right-[-8px] top-1/2 transform -translate-y-1/2"
          } w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 ${
            isBot ? "border-t-gray-100" : "border-t-blue-500"
          }`}
        ></div>
      </div>

      {sender !== "bot" && (
        <img
          src="/assets/user-avatar.png" // Avatar del usuario
          alt="User Avatar"
          className="w-8 h-8 rounded-full ml-2"
        />
      )}
    </div>
  );
};

export default Message;
