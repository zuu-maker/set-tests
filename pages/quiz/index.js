import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import StudentAuth from "@/components/auth/StudentAuth";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function Quiz() {
  let user = useSelector((state) => state.user);
  let params = useParams();
  return (
    <StudentAuth>
      <Sidebar />

      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          {user && user.activeSubscription ? (
            <iframe
              src="/SampleTest edited/index.html"
              width="100%"
              style={{ height: "100vh" }}
            ></iframe>
          ) : (
            <div>
              <p>
                You are not subscribed kindly go to your dashboard and subcribe
                thank you
              </p>
            </div>
          )}
        </div>
      </div>
    </StudentAuth>
  );
}

export default Quiz;
