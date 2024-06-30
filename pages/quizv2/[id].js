import React from "react";
import Quiz from "../../components/quiz/Quiz";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import { useParams } from "next/navigation";

function QuizPage() {
  const { id } = useParams();

  return (
    <div>
      <Sidebar />

      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          <Quiz id={id} />
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
