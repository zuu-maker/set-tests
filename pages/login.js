import React, { useState } from "react";
import Link from "next/link";
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/userSlice";
import toast from "react-hot-toast";
import Header from "@/components/Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  let router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        db.collection("Users")
          .where("email", "==", user.email)
          .get()
          .then((snap) => {
            if (snap.docs[0].exists) {
              dispatch(
                setUser({
                  _id: snap.docs[0].data()._id,
                  email: snap.docs[0].data().email,
                  name: snap.docs[0].data().name,
                  role: snap.docs[0].data().role,
                  verified: user.emailVerified,
                  phone: snap.docs[0].data().phone,
                })
              );
              if (snap.docs[0].data().role === "admin") {
                router.push("/admin");
              } else {
                router.push("/learn");
              }
            }
          })
          .catch((error) => {
            setLoading(false);
            toast.error("failed to get");
          });
        // ...
      })
      .catch((error) => {
        let errorMessage = JSON.parse(error.message);
        setLoading(false);
        toast.error(errorMessage.error.message);
      });
  };

  return (
    <div className="mx-auto">
      {" "}
      <div className="px-6 py-2 lg:px-8 bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-lg">
        <Header isHome={false} />
      </div>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16 w-auto"
            src="logo.png"
            alt="Sirus Educational Trust"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/forgot"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                disabled={!email || !password}
                className="flex w-full justify-center disabled:opacity-60 rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "processing..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
