import "../styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import AuthCheck from "@/components/auth/AuthCheck";
import MathJax from "react-mathjax";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Toaster />
      <AuthCheck>
        <Component {...pageProps} />
      </AuthCheck>
    </Provider>
  );
}

export default MyApp;
