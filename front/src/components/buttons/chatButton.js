import React, { useState } from "react";
import ChatBox from "../ChatBox";
import { motion, AnimatePresence } from "framer-motion";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-indigo-500/25 transition-shadow group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">
              💬
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && <ChatBox closeChat={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;
