import React from "react";
import Quiz from "../../../components/quiz/Quiz";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import StudentAuth from "@/components/auth/StudentAuth";

function QuizPage() {
  return (
    <StudentAuth>
      <Sidebar />

      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          <Quiz />
        </div>
      </div>
    </StudentAuth>
  );
}

export default QuizPage;
