import React, { useEffect } from "react";
import Link from "next/link";

// <div className="bg-white -mb-24 mt-4 lg:mt-0">
//   <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
//     <h1 className="text-2xl font-bold tracking-tight text-gray-900">
//       Grade 12 & GCE
//     </h1>
//     <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//       {courses &&
//         courses.length > 0 &&
//         courses.map((item) => (
//           <Link key={item.id} href={`/browse/${item.id}`}>
//             <div className="group relative">
//               <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
//                 <img
//                   src={item.image.url}
//                   alt={item.image.ref}
//                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                 />
//               </div>
//               <div className="mt-4 flex justify-between">
//                 <div>
//                   <h2 className="text-sm text-gray-700">
//                     <span aria-hidden="true" className="absolute inset-0" />
//                     {item.title}
//                   </h2>
//                 </div>
//                 <p className="text-sm font-medium text-gray-900">
//                   {item?.numberOfQuestions} questions
//                 </p>
//               </div>
//             </div>
//           </Link>
//         ))}
//     </div>
//   </div>
// </div>

function getTitle(title) {
  let parts = title.split(" ");
  let isGCE = parts.includes("GCE");
  let _title = "";

  if (isGCE) {
    _title = parts.slice(2).join(" ");
  } else {
    _title = parts.slice(3).join(" ");
  }
  return _title;
}

function getTag(title) {
  let parts = title.split(" ");
  let isGCE = parts.includes("GCE");
  let tag = "";

  if (isGCE) {
    tag = parts[0];
  } else {
    tag = parts[0] + " " + parts[1];
  }
  return tag;
}

function AllCourses({ courses }) {
  console.log(courses);

  // useEffect(() => {
  //   mySplit("GCE | Hello");
  // });
  return (
    <div className="p-8">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Grade 12 & GCE
              </h1>
              <p className="mt-2 text-lg text-gray-600 hidden lg:block">
                Choose from our comprehensive course collection
              </p>
            </div>
            <div className=" gap-2 hidden lg:flex">
              <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                {courses && courses.length} Subjects Available
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {courses &&
              courses.length > 0 &&
              courses.map((item) => (
                <Link
                  key={item.id}
                  href={`/browse/${item.id}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="aspect-w-16 aspect-h-12 relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                      <img
                        src={item.image.url}
                        alt={item.image.ref}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                          {getTag(item.title)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {getTitle(item.title)}
                        {/* {item.title} */}
                      </h3>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokWidth="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            ></path>
                          </svg>
                          <span> {item?.numberOfQuestions} questions</span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCourses;
