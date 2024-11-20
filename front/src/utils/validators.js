import { getCardIcon } from "./icons";

/**
 * Valida si una dirección de correo electrónico tiene un formato válido
 * @param {string} email - La dirección de correo electrónico a validar
 * @returns {string|undefined} - Mensaje de error si el email es inválido, undefined si es válido
 * @example
 * checkEmail('usuario@dominio.com') // undefined
 * checkEmail('correo-invalido') // 'Email inválido'
 * checkEmail('') // 'Email vacío'
 */
export function validateEmail(email) {
  if (!email) return "Email vacío";
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!re.test(email)) return "Email inválido";
}

/**
 * Valida un número de tarjeta de crédito y determina su tipo
 * @param {string} cardNumber - El número de tarjeta a validar
 * @returns {(string|Object)} - Mensaje de error si es inválida, o un objeto con la información de la tarjeta si es válida
 * @property {boolean} isValid - Indica si la tarjeta es válida
 * @property {string} type - El tipo de tarjeta (visa, mastercard, amex, discover)
 * @property {JSX.Element} icon - Componente de icono para el tipo de tarjeta
 * @example
 * validateCardNumber('4532123456788901') // { isValid: true, type: 'visa', icon: <SVG/> }
 * validateCardNumber('') // 'Número de tarjeta vacío'
 * validateCardNumber('1234') // 'Tarjeta no soportada'
 */
export function validateCardNumber(cardNumber) {
  if (!cardNumber) return "Número de tarjeta vacío";

  // Eliminar espacios y guiones
  const cleanNumber = cardNumber.replace(/[\s-]/g, "");

  // Verificar que solo contenga números
  if (!/^\d+$/.test(cleanNumber)) return "Número de tarjeta inválido";

  // Patrones para identificar las tarjetas
  const cardPatterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  };

  // Verificar el tipo de tarjeta
  for (const [type, pattern] of Object.entries(cardPatterns)) {
    if (pattern.test(cleanNumber)) {
      return {
        isValid: true,
        type: type,
        icon: getCardIcon(type),
      };
    }
  }

  return "Tarjeta no soportada";
}
