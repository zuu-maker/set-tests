import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Verified from "@/components/Verified";
import NotVerified from "@/components/NotVerified";
import Head from "next/head";

const SuccessIndex = () => {
  const router = useRouter();
  const { refToken } = router.query;
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  const verifyToken = async (_refToken) => {
    let parser = new DOMParser();

    let userId = _refToken.split("-")[0];
    let time = _refToken.split("-")[1];

    try {
      console.warn("here");
      const res = await axios.get(
        `NEXT_PUBLIC_BACKEND_URL=https://sea-turtle-app-2-zmgh4.ondigitalocean.app/api
        /read-order/${userId}/${time}`
      );

      if (!res.data.transactionToken) return;

      console.log(res.data.transactionToken);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dpo/verify-token`,
        {
          refToken: res.data.transactionToken,
        }
      );

      let doc = parser.parseFromString(data.data, "text/xml");
      let result = doc
        .getElementsByTagName("Result")[0]
        .childNodes[0].nodeValue.toString();
      let _error = doc
        .getElementsByTagName("ResultExplanation")[0]
        .childNodes[0].nodeValue.toString();

      console.log(result);
      if (result === "000") {
        setIsVerified(true);
        console.log("in the verify state");
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/verifiy-state`,
          {
            orderId: res.data._id,
            userId,
          }
        );
        //treat it as verified
        //send over user id and order id
        //change order status

        //if payment is verifed change users subscription state
      }

      if (result === "901") {
        //treat it as verified
      }

      if (result === "904" || result === "901") {
        //treat it as cancelled
      }

      // set to account error
      setError(_error);
      console.log("error -->", _error);
      setLoading(false);
    } catch (error) {
      console.log("error ->", error);
      console.error("error heree");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(router.query);
    console.log(window.location.href);
    verifyToken(refToken);
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Set - Verify Payment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <FadeLoader color="#00FFFF" />
        </div>
      ) : isVerified ? (
        <Verified />
      ) : (
        <NotVerified />
      )}
    </div>
  );
};

export default SuccessIndex;
