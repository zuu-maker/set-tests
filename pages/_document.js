import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full bg-white" lang="en">
      <Head>
        <meta httpEquiv="Permissions-Policy" content="camera=*, microphone=*" />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
      {/* <script
        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.js"
        integrity="sha512-jNhQbIhAWxcrT7jW8v+d0yV5Kr6JdV19ihsD3Z43VoS4/Cm0/O1zSoD20F8ffw5FRO+ZT5ucv8SwR+LFeNZ1sA=="
        crossOrigin="anonymous"
      ></script> */}
    </Html>
  );
}
