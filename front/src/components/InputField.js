import React from "react";

const InputField = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="text-black">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8459CC]"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
