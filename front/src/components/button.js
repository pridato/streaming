import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="w-full bg-[#6836D7] text-white py-2 rounded-lg hover:bg-[#B08FF5] transition duration-300"
    >
      {text}
    </button>
  );
};

export default Button;
