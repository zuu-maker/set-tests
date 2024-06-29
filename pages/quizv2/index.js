import React from "react";
import Quiz from "../../components/quiz/Quiz";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";

function QuizPage() {
  return (
    <div>
      <Sidebar />

      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          <Quiz />
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
