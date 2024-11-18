import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/30 backdrop-blur-md border-b border-gray-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-medium hover:text-blue-400 transition-colors"
            >
              <span className="bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text">
                ChatBot
              </span>
            </Link>
          </div>

          <Link
            to="/login"
            className="px-4 py-2 text-sm text-gray-400 hover:text-gray-100 transition-colors duration-300"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
