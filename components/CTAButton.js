import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function CTAButton({ setVisible }) {
  const { user } = useSelector((state) => state);
  return (
    <>
      {user && user._id ? (
        <button
          onClick={() => {
            setVisible(true);
          }}
          // disabled={disabled || loading}
          className="group relative inline-flex items-center justify-center text-sm px-6 py-3 overflow-hidden font-bold text-white rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:scale-105 disabled:hover:scale-100"
        >
          {/* Animated background effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>

          {/* Shine effect */}
          <span className="absolute inset-0 w-full h-full">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          </span>

          {/* Content */}
          <span className="relative flex items-center space-x-3">
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300"
              >
                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                <path
                  fillRule="evenodd"
                  d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg">Subscribe Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          </span>
        </button>
      ) : (
        <Link
          href="/login"
          // disabled={disabled || loading}
          className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:scale-105 disabled:hover:scale-100"
        >
          {/* Animated background effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>

          {/* Shine effect */}
          <span className="absolute inset-0 w-full h-full">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          </span>

          {/* Content */}
          <span className="relative flex items-center space-x-3">
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300"
              >
                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                <path
                  fillRule="evenodd"
                  d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg">Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          </span>
        </Link>
      )}
    </>
  );
}

export default CTAButton;
