import React from "react";

const Tooltip = ({ children, text }) => {
  return (
    <button className="relative group">
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
        {text}
      </div>
    </button>
  );
};

export default Tooltip;
