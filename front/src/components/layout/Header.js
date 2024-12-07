import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobals } from "../../globals/globals";
import { useTranslation } from "react-i18next";
import "./../../i18n";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { navigation, products } = useGlobals();

  const changeLanguage = (lng) => {
    setIsLanguageOpen(false);
    i18n.changeLanguage(lng);
  };

  // Efecto que maneja el estado de scroll de la página
  // Actualiza isScrolled a true cuando el usuario hace scroll hacia abajo
  // y a false cuando está en la parte superior
  useEffect(() => {
    // Función que verifica la posición del scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Agregar el event listener al montar el componente
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remover el event listener al desmontar
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-900" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-semibold hover:opacity-80 transition-opacity"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                ChatBot
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-lg text-gray-300 hover:text-purple-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center text-lg text-gray-300 hover:text-purple-400 transition-colors"
              >
                {t("header.navigation.products")}
                <IconChevronDown className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-80 rounded-md bg-slate-800 shadow-lg py-2"
                  >
                    {products.map((product) => {
                      const Icon = product.icon;
                      return (
                        <Link
                          key={product.name}
                          to={product.href}
                          className="flex items-start gap-3 px-4 py-3 text-lg text-gray-300 hover:bg-slate-700 hover:text-purple-400 transition-colors"
                          onClick={() => setIsProductsOpen(false)}
                        >
                          <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-gray-400">
                              {product.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Idioma Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center text-lg text-gray-300 hover:text-purple-400 transition-colors"
              >
                {t("header.navigation.language")}
                <IconChevronDown className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-40 rounded-md bg-slate-800 shadow-lg py-2"
                  >
                    <button
                      className="w-full block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 transition-colors"
                      onClick={() => changeLanguage("es")} // Cambiar a español
                    >
                      {t("header.navigation.products_list.spanish")}
                    </button>
                    <button
                      className="w-full block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 transition-colors"
                      onClick={() => changeLanguage("en")} // Cambiar a inglés
                    >
                      {t("header.navigation.products_list.english")}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop Auth Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-lg text-gray-300 hover:text-purple-400 transition-colors"
            >
              {t("header.navigation.login")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <IconX className="h-6 w-6" />
              ) : (
                <IconMenu2 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-gray-800"
          >
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Products Menu */}
              <div className="space-y-2">
                <div className="text-gray-300">Productos</div>
                {products.map((product) => (
                  <Link
                    key={product.name}
                    to={product.href}
                    className="block pl-4 text-gray-300 hover:text-purple-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
              <div className="pt-4 space-y-4">
                <Link
                  to="/login"
                  className="block text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
