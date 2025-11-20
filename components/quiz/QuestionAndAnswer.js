import React from "react";
import ResultCard from "./ResultCard";
import {
  Book,
  TrendingUp,
  Clock,
  Target,
  Award,
  FileText,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Users,
  Brain,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Activity,
  Zap,
  RefreshCw,
} from "lucide-react";

function QuestionAndAnswer({ questions, answers, navigateBack }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={navigateBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Exams
        </button>
      </div>
      <div className="px-4 py-12 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Detailed Review
          </h2>
          <p className="text-gray-600">
            Review your answers and learn from explanations
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <ResultCard
              key={index}
              answers={answers}
              index={index}
              question={question}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionAndAnswer;
