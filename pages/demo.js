import Banner from "@/components/Banner";
import Header from "@/components/Header";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

function Demo() {
  return (
    <div>
      <div className="pl-4">
        <Link href="/">
          <ChevronLeftIcon className="h-10 w-10 " />
        </Link>
      </div>
      <iframe
        src="/sample-test/index.html"
        width="100%"
        style={{ height: "95.6vh" }}
      ></iframe>
    </div>
  );
}

export default Demo;
