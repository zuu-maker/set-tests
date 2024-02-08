import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Offer from "@/components/Offer";
import Head from "next/head";
import WhyUs from "@/components/WhyUs";
import Faq from "@/components/Faq";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Home() {
  const [show, setShow] = useState(true);

  return (
    <main>
      <Head>
        <title>Sirius Educational Trust</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner show={show} setShow={setShow} />

      <div className="container mx-auto">
        <Hero />
        <AboutUs />
        <Offer />
        <WhyUs />
        <Faq />
      </div>
      <Footer />
    </main>
  );
}
