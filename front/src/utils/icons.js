/**
 * Obtiene el icono SVG correspondiente al tipo de tarjeta de crédito
 * @param {string} type - El tipo de tarjeta (visa, mastercard, amex, discover)
 * @returns {JSX.Element|null} - Componente SVG del icono de la tarjeta o null si no existe
 * @example
 * getCardIcon('visa') // <svg>...</svg>
 * getCardIcon('invalid') // null
 */
export function getCardIcon(type) {
  const icons = {
    visa: <img src="/assets/visa.svg" alt="visa" className="w-12 h-12" />,
    mastercard: (
      <img
        src="/assets/mastercard.svg"
        alt="mastercard"
        className="w-12 h-12"
      />
    ),
    amex: <img src="/assets/amex.svg" alt="amex" className="w-12 h-12" />,
  };

  return icons[type] || null;
}
