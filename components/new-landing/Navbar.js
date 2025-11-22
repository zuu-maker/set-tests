import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@/firebase";
import { logOutUser } from "@/slices/userSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";

const navigationPhone = [
  { name: "Subjects", href: "/browse" },
  { name: "For Schools", href: "/schools" },
  { name: "For Funders", href: "/funders" },
  // { name: "For Funders", href: "/browse" },
];

function Navbar({ isHome = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let router = useRouter();

  const handleLogout = async () => {
    // await SessionManger.endSession(user._id);
    auth
      .signOut()
      .then(() => {
        router.push("/login");
      })
      .then(() => {
        dispatch(logOutUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    // Navbar scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      {!mobileMenuOpen && (
        <nav id="navbar" className={isScrolled ? "scrolled" : ""}>
          <div className="nav-container">
            <Link href="/" className="logo">
              <img className="h-14" src="/new_logo.jpg" alt="" />
            </Link>

            <div className="flex md:hidden">
              <button
                type="button"
                className="sm:-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>

            {/* <div className="logo-text">Sirius Educational Trust</div> */}

            <ul className="nav-links">
              {/* <li>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, "#about")}>
              About
            </a>
          </li> */}
              {/* <li>
            <a href="#values" onClick={(e) => handleSmoothScroll(e, "#values")}>
              For Students
            </a>
          </li> */}
              <li>
                <Link href="/browse">Subjects</Link>
              </li>
              <li>
                <Link href="/schools">For Schools</Link>
              </li>
              <li>
                <Link href="/funders">For Funders</Link>
              </li>

              {/* <li>
            <a href="#faq" onClick={(e) => handleSmoothScroll(e, "#faq")}>
              Pricing
            </a>
          </li>
          <li>
            <a href="#faq" onClick={(e) => handleSmoothScroll(e, "#faq")}>
              FAQs
            </a>
          </li> */}
              {/* <li>
            <Link
              href="/browse"
              // onClick={(e) => handleSmoothScroll(e, "#contact")}
            >
              Courses
            </Link>
          </li> */}

              {/* <li>
            {user && (user.role === "admin" || user.role === "partner") && (
              <Link
                href="/admin"
                className={`font-semibold text-gray-900 hover:text-gray-900 ${
                  isHome
                    ? "text-gray-900 hover:text-gray-900"
                    : "text-white hover:text-white"
                } `}
              >
                Dashboard
              </Link>
            )}
            {user && user.role === "student" && (
              <Link
                href="/learn"
                className="font-semibold text-gray-900 hover:text-gray-900"
              >
                My Courses
              </Link>
            )}
          </li> */}
            </ul>
            {user && user._id.length > 0 ? (
              <>
                {user && (user.role === "admin" || user.role === "partner") && (
                  <Link
                    href="/admin"
                    className="cta-button hidden md:block cta-button"
                  >
                    Dashboard
                  </Link>
                )}
                {user && user.role === "student" && (
                  <Link
                    href="/learn"
                    className="cta-button hidden md:block cta-button"
                  >
                    Continue Learning
                  </Link>
                )}
              </>
            ) : (
              <Link
                className="hidden md:block cta-button cta-button"
                href="/login"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      )}
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel
          focus="true"
          className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden"
        >
          <div className="flex h-9 items-center justify-between">
            <div className="flex">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Sirius Education Trust</span>
                <img className="h-14" src="/new_logo.jpg" alt="" />
              </a>
            </div>
            <div className="flex">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigationPhone.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={`-mx-3  rounded-lg px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10  ${
                        item.name !== "Courses" && !isHome ? "hidden" : "Block"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
                {user && user._id.length > 0 && (
                  <Link
                    href={user.role === "admin" ? "/admin" : "/learn"}
                    className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                  >
                    {user.role === "admin" ? "Dashboard" : "Continue Learning"}
                  </Link>
                )}
              </div>
              <div className="py-2">
                {user && user._id.length > 0 ? (
                  <button
                    onClick={handleLogout}
                    className={`inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20`}
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </React.Fragment>
  );
}

export default Navbar;
