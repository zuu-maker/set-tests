import React, { useEffect, useState } from "react";

// Confetti Component - Pure CSS/Tailwind implementation
const Confetti = () => {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-pink-500",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(50)].map((_, i) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomLeft = Math.random() * 100;
        const randomAnimationDuration = 2 + Math.random() * 2;
        const randomDelay = Math.random() * 2;
        const randomSize = 8 + Math.random() * 8;

        return (
          <div
            key={i}
            className={`absolute ${randomColor} rounded-sm`}
            style={{
              left: `${randomLeft}%`,
              top: "-10px",
              width: `${randomSize}px`,
              height: `${randomSize}px`,
              animation: `confettiFall ${randomAnimationDuration}s linear ${randomDelay}s forwards`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}

      {/* Add keyframes via style tag */}
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
