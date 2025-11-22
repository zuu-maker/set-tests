import { auth } from "@/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "@/slices/userSlice";

function AdminNav() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let router = useRouter();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        router.push("/");
        dispatch(logOutUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatExpiresOn = (_) => {
    let date = new Date(_);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCurrentPage = () => {
    const path = router.pathname.split("/")[1];
    if (path === "learn") return "My Courses";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Breadcrumb & Page Title */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 text-sm mb-1">
              <Link
                href="/admin"
                className="text-gray-500 hover:text-cyan-600 transition-colors font-medium"
              >
                Dashboard
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">
                {getCurrentPage()}
              </span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              {getCurrentPage()}
            </h1>
          </div>

          {/* Desktop User Info */}
          <div className="hidden xl:flex items-center space-x-4">
            {/* Subscription Badge */}
            {user !== null && user.activeSubscription && user.expiresOn > 0 && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-cyan-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-600">
                    Active Until
                  </span>
                  <span className="text-sm font-semibold text-cyan-700">
                    {formatExpiresOn(user.expiresOn)}
                  </span>
                </div>
              </div>
            )}

            {/* User Profile */}
            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-cyan-300 transition-colors">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md">
                {getInitials(user !== null ? user.name : "")}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  {user !== null && user.name}
                </span>
                <span className="text-xs text-gray-500 capitalize">
                  {user !== null && user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex xl:hidden items-center space-x-2">
            {/* User Avatar/Menu Toggle */}
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
            >
              {getInitials(user !== null ? user.name : "")}
              {user !== null &&
                user.activeSubscription &&
                user.expiresOn > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
            </button>

            {/* Home Button */}
            {/* <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </Link> */}

            {/* Logout Button */}
            {/* <button
              onClick={handleLogout}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button> */}
          </div>
        </div>

        {/* Mobile User Info Dropdown */}
        {showUserMenu && (
          <div className="xl:hidden pb-4 border-t border-gray-200 mt-2 pt-4 animate-fadeIn">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-semibold shadow-md">
                  {getInitials(user !== null ? user.name : "")}
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-gray-900">
                    {user !== null && user.name}
                  </span>
                  <span className="text-sm text-gray-600 capitalize">
                    {user !== null && user.role}
                  </span>
                </div>
              </div>

              {user !== null &&
                user.activeSubscription &&
                user.expiresOn > 0 && (
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-cyan-200 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-cyan-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">
                        Active Until
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-cyan-700">
                      {formatExpiresOn(user.expiresOn)}
                    </span>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminNav;

// import { auth } from "@/firebase";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React from "react";
// import { useSelector } from "react-redux";

// function AdminNav() {
//   let user = useSelector((state) => state.user);

//   let router = useRouter();

//   const handleLogout = () => {
//     auth
//       .signOut()
//       .then(() => {
//         router.push("/");
//         dispatch(logOutUser());
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const formatExpiresOn = (_) => {
//     let date = new Date(_);
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className="block  min-w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1 ">
//       <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
//         <div className="capitalize">
//           <div aria-label="breadcrumb" className="w-max">
//             <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
//               <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
//                 <Link href="/admin">
//                   <p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
//                     dashboard
//                   </p>
//                 </Link>
//                 <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
//                   /
//                 </span>
//               </li>
//               <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
//                 <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
//                   {router.pathname.split("/")[1] === "learn"
//                     ? "My Courses"
//                     : router.pathname.split("/")[1]}
//                 </p>
//               </li>
//             </ol>
//           </div>
//           <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">
//             {router.pathname.split("/")[1] === "learn"
//               ? "My Courses"
//               : router.pathname.split("/")[1]}
//           </h6>
//         </div>
//         <div className="flex flex-col items-end xl:justify-normal">
//           <div
//             className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm pt-3 rounded-lg text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex"
//             type="button"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               aria-hidden="true"
//               className="h-5 w-5 text-blue-gray-500"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//             {user !== null && user.name}
//           </div>
//           {user !== null && user.activeSubscription && user.expiresOn > 0 && (
//             <div
//               className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex"
//               type="button"
//             >
//               {"expires on :" + formatExpiresOn(user.expiresOn)}
//             </div>
//           )}

//           <button
//             className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30  xl:hidden"
//             type="button"
//           >
//             <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 aria-hidden="true"
//                 className="h-5 w-5"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </span>
//           </button>

//           <div className="xl:hidden flex items-center space-x-2 pr-2">
//             <Link
//               href="/"
//               className=" middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 xl:hidden"
//               type="button"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-5 h-5"
//               >
//                 <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
//                 <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
//               </svg>
//             </Link>
//             <button
//               className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30  xl:hidden"
//               type="button"
//               onClick={handleLogout}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 aria-hidden="true"
//                 className="w-5 h-5 text-inherit"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminNav;
