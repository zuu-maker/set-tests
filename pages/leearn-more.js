import React from "react";
import Header from "../components/Header";
import Head from "next/head";
import { useState, useRef } from "react";
import Loader from "../components/util/Loader";
import { useEffect } from "react";

const learnMore = () => {
  //set default value
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full">
      <Head>
        <title>Learn More </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" sm:container sm:mx-auto">
        <div className="h-8"></div>
        <Header />
        <div className="mt-5">
          {loading && (
            <div className="p-8">
              <Loader />
            </div>
          )}
          <object
            onLoad={() => setLoading(false)}
            className="min-h-screen  sm:min-h-96"
            type="text/html"
            width="100%"
            height="100%"
            data="https://ezzychat.ezzycrm.com/LandingPage.html?AccountLeadBotId=%2bj8Aw2ZExw9hN2MZVgIdRg%3d%3d"
          ></object>
        </div>
      </div>
    </div>
  );
};

export default learnMore;
