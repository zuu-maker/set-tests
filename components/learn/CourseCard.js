import Link from "next/link";

const CourseCard = ({ item }) => {
  // Calculate progress percentage (mock data - replace with actual progress)

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          <img
            src={
              item.image?.url ||
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"
            }
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-3">
            {item.title}
          </h3>

          {/* Course Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
            {item.numberOfQuestions && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>{item.numberOfQuestions} questions</span>
              </div>
            )}
            {item.free && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>

                <span>{item.free ? "Free" : "Paid"}</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <Link
            href={`/learn/tests/${item.id}`}
            className="block w-full text-center bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:from-cyan-700 hover:to-cyan-800 hover:shadow-lg group"
          >
            <span className="flex items-center justify-center gap-2">
              {/* {progress > 0 && progress < 100
                ? "Continue Learning"
                : "Open Course"} */}
              Open Course
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
