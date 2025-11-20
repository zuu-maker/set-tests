import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
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
import { db } from "@/firebase";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Link from "next/link";
import QuestionAndAnswer from "../quiz/QuestionAndAnswer";

// Mock data - Replace with Firebase calls
const mockSubjects = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "📐",
    totalExams: 12,
    completedExams: 8,
    averageScore: 75.5,
    lastAttempt: "2024-11-08",
    totalTimeSpent: 10800, // seconds
    color: "blue",
  },
  {
    id: "physics",
    name: "Physics",
    icon: "⚛️",
    totalExams: 10,
    completedExams: 6,
    averageScore: 68.2,
    lastAttempt: "2024-11-07",
    totalTimeSpent: 8640,
    color: "purple",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "🧪",
    totalExams: 8,
    completedExams: 7,
    averageScore: 82.3,
    lastAttempt: "2024-11-06",
    totalTimeSpent: 7200,
    color: "green",
  },
  {
    id: "biology",
    name: "Biology",
    icon: "🧬",
    totalExams: 9,
    completedExams: 5,
    averageScore: 71.8,
    lastAttempt: "2024-11-05",
    totalTimeSpent: 6480,
    color: "emerald",
  },
];

const mockExamsBySubject = {
  mathematics: [
    {
      id: "exam1",
      title: "Algebra Fundamentals",
      year: 2024,
      totalQuestions: 25,
      attempts: 3,
      lastScore: 78,
      bestScore: 85,
      averageScore: 76.3,
      lastAttempt: "2024-11-08",
      totalTimeSpent: 3600,
      status: "completed",
    },
    {
      id: "exam2",
      title: "Calculus I - Derivatives",
      year: 2024,
      totalQuestions: 30,
      attempts: 2,
      lastScore: 72,
      bestScore: 72,
      averageScore: 68,
      lastAttempt: "2024-11-07",
      totalTimeSpent: 4200,
      status: "completed",
    },
    {
      id: "exam3",
      title: "Linear Algebra",
      year: 2024,
      totalQuestions: 20,
      attempts: 0,
      lastScore: null,
      bestScore: null,
      averageScore: null,
      lastAttempt: null,
      totalTimeSpent: 0,
      status: "not-started",
    },
    {
      id: "exam4",
      title: "Geometry and Trigonometry",
      year: 2023,
      totalQuestions: 35,
      attempts: 1,
      lastScore: null,
      bestScore: null,
      averageScore: null,
      lastAttempt: "2024-11-04",
      totalTimeSpent: 1200,
      status: "in-progress",
    },
  ],
};

const mockExamDetails = {
  exam1: {
    id: "exam1",
    title: "Algebra Fundamentals",
    attempts: [
      {
        date: "2024-11-08",
        score: 78,
        timeSpent: 1200,
        correctAnswers: 20,
        totalQuestions: 25,
      },
      {
        date: "2024-11-05",
        score: 85,
        timeSpent: 1500,
        correctAnswers: 21,
        totalQuestions: 25,
      },
      {
        date: "2024-11-01",
        score: 65,
        timeSpent: 900,
        correctAnswers: 16,
        totalQuestions: 25,
      },
    ],
    questionCategories: [
      { category: "Linear Equations", correct: 8, total: 10 },
      { category: "Quadratic Functions", correct: 6, total: 8 },
      { category: "Polynomials", correct: 4, total: 7 },
    ],
    timeDistribution: [
      { question: "Q1-Q5", time: 300 },
      { question: "Q6-Q10", time: 280 },
      { question: "Q11-Q15", time: 320 },
      { question: "Q16-Q20", time: 200 },
      { question: "Q21-Q25", time: 100 },
    ],
  },
};

const AssessmentSystem = ({ setLoader }) => {
  const [currentView, setCurrentView] = useState("subjects"); // subjects, exams, exam-details
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  // const [subjects, setSubjects] = useState(mockSubjects);
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  const [examDetails, setExamDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const user = useSelector((state) => state.user);

  const fetchExams = async (subjectId) => {
    try {
      const examDocs = await db
        .collection("Users")
        .doc(user._id)
        .collection("ExamDetails")
        .where("courseId", "==", subjectId)
        .get();
      const _exams = examDocs.docs.map((doc) => doc.data());
      console.log(_exams);
      setExams(_exams || []);
      setExams(_exams || []);
    } catch (error) {
      toast.error("Failed to fetch subjects");
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchSubjects = async (userId) => {
    try {
      const subjectDocs = await db
        .collection("Users")
        .doc(userId)
        .collection("Subjects")
        .get();
      const _subjects = subjectDocs.docs.map((doc) => doc.data());
      console.log(_subjects);
      setSubjects(_subjects);
    } catch (error) {
      toast.error("Failed to fetch subjects");
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls the window back to the top
  }, [currentView]);

  useEffect(() => {
    if (user && user._id) {
      fetchSubjects(user._id);
    }
  }, []);
  // Navigation functions
  const navigateToExams = (subject) => {
    setLoader(true);

    setSelectedSubject(subject);
    fetchExams(subject.id);

    // setExams(mockExamsBySubject[subject.id] || []);
    setCurrentView("exams");
    setLoader(false);
  };

  const navigateToExamDetails = (exam) => {
    setLoader(true);
    setSelectedExam(exam);
    // setExamDetails(mockExamDetails[exam.id] || null);
    setExamDetails(exam || null);
    setCurrentView("exam-details");
    setLoader(false);
  };

  const navigateToReview = (exam) => {
    // setSelectedExam(exam);
    // setExamDetails(mockExamDetails[exam.id] || null);
    // setExamDetails(exam || null);
    setLoader(true);
    console.log(exam);
    setQuestions(exam.questions || []);
    setAnswers(exam.userAnswers);
    setCurrentView("review");
    setLoader(false);
  };

  const navigateBack = () => {
    if (currentView === "exam-details") {
      setCurrentView("exams");
      setSelectedExam(null);
    } else if (currentView === "exams") {
      setCurrentView("subjects");
      setSelectedSubject(null);
    } else if (currentView === "review") {
      setCurrentView("exam-details");
      setQuestions([]);
      setAnswers([]);
    }
  };

  // Helper functions
  const formatTime = (seconds) => {
    if (!seconds) return "0 min";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`;
  };

  const formatDate = (date) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500 text-blue-600 bg-blue-50 border-blue-200",
      purple: "bg-purple-500 text-purple-600 bg-purple-50 border-purple-200",
      green: "bg-green-500 text-green-600 bg-green-50 border-green-200",
      emerald:
        "bg-emerald-500 text-emerald-600 bg-emerald-50 border-emerald-200",
    };
    return colors[color] || colors.blue;
  };

  const getScoreColor = (score) => {
    if (!score && score !== 0) return "text-gray-400";
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const secondsToMinutes = (seconds) => {
    return seconds / 60;
  };

  // SUBJECTS VIEW
  const SubjectsView = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessments</h1>
        {subjects.length > 0 && (
          <p className="text-gray-600">
            Choose a subject to view your exams and progress
          </p>
        )}
      </div>

      {subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => {
            const colors = getColorClasses(subject.color);
            const completionRate =
              (subject.examsAttempted.length / subject.totalExams) * 100;

            return (
              <div
                key={subject.id}
                onClick={() => navigateToExams(subject)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* <div className="text-3xl">{subject.icon}</div> */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {subject.courseTitle}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {subject.examsAttempted.length}/{subject.totalExams}{" "}
                        exams completed
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors mt-1" />
                </div>

                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        {completionRate.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${
                          colors.split(" ")[0]
                        } h-2 rounded-full transition-all`}
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  {/* <div className="grid grid-cols-3 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-gray-500">Average Score</p>
                    <p
                      className={`text-lg font-semibold ${getScoreColor(
                        subject.averageScore
                      )}`}
                    >
                      {subject.averageScore
                        ? `${subject.averageScore.toFixed(1)}%`
                        : "--"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time Spent</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatTime(subject.totalTimeSpent)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Activity</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(subject.lastAttempt)}
                    </p>
                  </div>
                </div> */}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p>You have not taken any tests</p>
        </div>
      )}
    </div>
  );

  // EXAMS LIST VIEW
  const ExamsView = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="mb-8">
        <button
          onClick={navigateBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Subjects
        </button>
        <div className="flex items-center gap-3">
          {/* <div className="text-3xl">{selectedSubject.icon}</div> */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedSubject.courseTitle} Exams
            </h1>
            <p className="text-gray-600">
              {selectedSubject.examsAttempted.length} of{" "}
              {selectedSubject.totalExams} completed
            </p>
          </div>
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid gap-4">
        {exams.map((exam) => {
          const isCompleted = exam.status === "completed";
          const isInProgress = exam.status === "in-progress";
          const isNotStarted = exam.status === "not-started";

          return (
            <div
              key={exam.id}
              onClick={() => navigateToExamDetails(exam)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {exam.title}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {exam.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {exam.totalQuestions} questions
                    </div>
                    <div className="flex items-center gap-1">
                      <RefreshCw className="w-4 h-4" />
                      {exam.attempts.length}{" "}
                      {exam.attempts.length === 1 ? "attempt" : "attempts"}
                    </div>
                    {exam.timeSpent > 0 && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {secondsToMinutes(exam.timeSpent).toFixed(2)} total
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Score Display */}
                  {exam.lastScore !== null && (
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Last Score</p>
                      <p
                        className={`text-2xl font-bold ${getScoreColor(
                          exam.lastScore
                        )}`}
                      >
                        {exam.lastScore}%
                      </p>
                      {exam.bestScore !== null &&
                        exam.bestScore !== exam.lastScore && (
                          <p className="text-xs text-gray-500">
                            Best: {exam.bestScore}%
                          </p>
                        )}
                    </div>
                  )}

                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Last Attempt Info */}

              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>
                  Last attempted:{" "}
                  {exam.lastDateTaken.toDate().toLocaleDateString()}
                </span>
                {exam.averageScore && (
                  <span>Average score: {exam.averageScore.toFixed(1)}%</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // EXAM DETAILS VIEW
  const ExamDetailsView = () => {
    if (!examDetails) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Exams
          </button>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Data Available
            </h2>
            <p className="text-gray-600">
              Take this exam to see your analytics
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Start Exam
            </button>
          </div>
        </div>
      );
    }

    const scoreData = examDetails.attempts.map((attempt, index) => ({
      attempt: `Attempt ${index + 1}`,
      date: attempt.dateTaken.split("T")[0],
      score: attempt.score,
      time: secondsToMinutes(attempt.timeSpent).toFixed(2),
    }));

    // const categoryData = examDetails.questionCategories.map((cat) => ({
    //   category: cat.category,
    //   percentage: ((cat.correct / cat.total) * 100).toFixed(1),
    //   correct: cat.correct,
    //   total: cat.total,
    // }));

    // const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Exams
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedExam.title}
            </h1>
            <p className="text-gray-600">
              {selectedExam.totalQuestions} questions •{" "}
              {selectedExam.attempts.length} attempts • Average score:{" "}
              {selectedExam.averageScore?.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Best Score</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {selectedExam.bestScore}%
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {selectedExam.averageScore?.toFixed(1)}%
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600">Total Time</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {secondsToMinutes(selectedExam.timeSpent).toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <RefreshCw className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-sm text-gray-600">Attempts</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {selectedExam.attempts.length}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Score Progression
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="attempt" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                  formatter={(value, name) => {
                    if (name === "score") return [`${value}%`, "Score"];
                    return [value, name];
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#DBEAFE"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Time Distribution per Section
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={examDetails.timeDistributions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
                formatter={(value) => [`${value}s`, "Time"]}
              />
              <Bar dataKey="time" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attempts History Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Attempt History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Correct
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Time Spent
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {examDetails.attempts.map((attempt, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {attempt.dateTaken.split("T")[0]}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-semibold ${getScoreColor(
                          attempt.score
                        )}`}
                      >
                        {attempt.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {attempt.correctAnswers}/{attempt.totalQuestions}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {secondsToMinutes(attempt.timeSpent).toFixed(2)} min
                    </td>
                    {/* <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Review Answers
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            href={`/learn/tests/${selectedSubject.id}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retake Exam
          </Link>
          <button
            onClick={() => navigateToReview(examDetails)}
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Review Questions
          </button>
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "subjects" && <SubjectsView />}
      {currentView === "exams" && <ExamsView />}
      {currentView === "exam-details" && <ExamDetailsView />}
      {currentView === "review" && (
        <QuestionAndAnswer
          questions={questions}
          answers={answers}
          navigateBack={navigateBack}
        />
      )}
    </div>
  );
};

export default AssessmentSystem;
