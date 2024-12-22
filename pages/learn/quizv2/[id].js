import React, { useEffect, useState } from "react";
import Quiz from "@/components/quiz/Quiz";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

function QuizPage() {
  const { id } = useParams();
  // TODO: do not forget to add the user here
  const { user } = useSelector((state) => state);

  return (
    <div>
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          {user && user._id && user.activeSubscription ? (
            <Quiz id={id} />
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-red-500">Oops, access denied</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
