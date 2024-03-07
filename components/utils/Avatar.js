import React from "react";

const Avatar = ({ index = null, src = null }) => {
  return (
    <div>
      {src ? (
        <img
          className="w-20 h-20 rounded-full"
          src={src}
          alt="Rounded avatar"
        />
      ) : (
        <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full">
          <span className="font-medium text-gray-600 ">{index + 1}</span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
