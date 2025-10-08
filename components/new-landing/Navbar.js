import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@/firebase";
import { logOutUser } from "@/slices/userSlice";
import { useRouter } from "next/router";
import Link from "next/link";

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
    <nav id="navbar" className={isScrolled ? "scrolled" : ""}>
      <div className="nav-container">
        <Link href="/" className="logo">
          <img className="h-14" src="/logo.png" alt="" />
        </Link>

        {/* <div className="logo-text">Sirius Educational Trust</div> */}

        <ul className="nav-links">
          <li>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, "#about")}>
              About
            </a>
          </li>
          <li>
            <a href="#values" onClick={(e) => handleSmoothScroll(e, "#values")}>
              Our Values
            </a>
          </li>
          <li>
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "#features")}
            >
              Features
            </a>
          </li>
          <li>
            <a href="#faq" onClick={(e) => handleSmoothScroll(e, "#faq")}>
              FAQ
            </a>
          </li>
          <li>
            <Link
              href="/browse"
              // onClick={(e) => handleSmoothScroll(e, "#contact")}
            >
              Courses
            </Link>
          </li>

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
              <Link href="/admin" className="cta-button">
                Dashboard
              </Link>
            )}
            {user && user.role === "student" && (
              <Link href="/learn" className="cta-button">
                My Courses
              </Link>
            )}
          </>
        ) : (
          <Link href="/login" className="cta-button">
            Sign In
          </Link>
        )}
        {/* <Link href="#" className="cta-button">
          Login
        </Link> */}
      </div>
    </nav>
  );
}

export default Navbar;
