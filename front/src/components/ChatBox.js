import React, { useState, useEffect } from "react";
import { IconArrowsDiagonalMinimize2, IconSend } from "@tabler/icons-react";
import Message from "./message";
import useChatStore from "../context/chatStore";
import { getChatBotResponse } from "../services/chatBotService";
import { showToast } from "../services/toastService";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";

const ChatBox = ({ closeChat }) => {
  const toast = useToast();
  const [message, setMessage] = useState("");
  const { messages, isLoading, addMessage, setLoading, loadMessages } =
    useChatStore();

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    const scrollPosition = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("width");
      window.scrollTo(0, scrollPosition);
    };
  }, []);

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;

    setLoading(true);
    try {
      addMessage({ sender: "user", text: trimmedMessage });
      const response = await getChatBotResponse(trimmedMessage);
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
    <>
      <div
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
        onClick={closeChat}
      />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 right-0 w-full h-[85vh] 
          sm:h-[600px] sm:max-h-[85vh] sm:w-[400px] 
          lg:right-6 lg:bottom-6 
          bg-slate-900 border border-slate-800 
          rounded-t-2xl sm:rounded-2xl 
          shadow-2xl shadow-indigo-500/10 
          overflow-hidden z-50"
      >
        {/* Header */}
        <div
          className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 
          border-b border-slate-800 flex justify-between items-center"
        >
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-base">
              Chat Asistente
            </h3>
            <p className="text-slate-400 text-xs">
              Siempre disponible para ayudarte
            </p>
          </div>
          <button
            onClick={closeChat}
            className="p-1.5 hover:bg-slate-800 rounded-full transition-colors"
          >
            <IconArrowsDiagonalMinimize2
              className="text-slate-400 w-5 h-5"
              stroke={1.5}
            />
          </button>
        </div>

        {/* Messages Area */}
        <div
          className="h-[calc(100%-8rem)] overflow-y-auto p-3 
          scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
        >
          {messages.map((msg, index) => (
            <Message key={index} sender={msg.sender} text={msg.text} />
          ))}
        </div>

        {/* Input Area */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3 
          bg-slate-900 border-t border-slate-800"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSendMessage()
              }
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-slate-800 text-slate-200 text-sm
                rounded-xl px-4 py-2.5 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 
                border border-slate-700"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="p-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 
                rounded-xl text-white disabled:opacity-50 
                hover:shadow-lg hover:shadow-indigo-500/25 transition-shadow"
            >
              <IconSend
                stroke={1.5}
                className={`w-5 h-5 ${isLoading ? "animate-pulse" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChatBox;
