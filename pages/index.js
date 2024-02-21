import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Offer from "@/components/Offer";
import Head from "next/head";
import WhyUs from "@/components/WhyUs";
import Faq from "@/components/Faq";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Head>
        <title>Sirius Educational Trust</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner show={true} />

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
