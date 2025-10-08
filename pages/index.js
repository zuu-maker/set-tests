import Head from "next/head";

import Banner from "../components/Banner";

import { motion, useInView } from "framer-motion";

import AuthCheck from "@/components/auth/AuthCheck";
import { useEffect, useRef, useState } from "react";

import Navbar from "@/components/new-landing/Navbar";
import Footer from "@/components/new-landing/Footer";
import Hero from "@/components/new-landing/Hero";
import About from "@/components/new-landing/About";
import Values from "@/components/new-landing/Values";
import WhyUs from "@/components/new-landing/WhyUs";
import Faq from "@/components/new-landing/Faq";

export default function Home() {
  return (
    <AuthCheck>
      <Head>
        <title>Sirius Educational Trust</title>
        <meta>
          Providing quality education and exam preparation services. Access
          affordable online courses and exam practice materials for Grade 12
          &amp; GCE students.
        </meta>
        <link rel="icon" href="/favicon.ico" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS}', {
            page_path: window.location.pathname,
          });`,
          }}
        />
      </Head>

      <Banner show={false} />

      <div className="">
        <div className="bg-pattern">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>
        <Navbar />
        <Hero />
        <About />
        <Values />
        <WhyUs />
        <Faq />
        <Footer />
      </div>
    </AuthCheck>
  );
}
