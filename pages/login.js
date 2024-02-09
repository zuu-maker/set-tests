import React, { useState } from "react";
import Link from "next/link";
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/userSlice";

function Login() {
  const [email, setEmail] = useState("jon@mail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  let router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    console.table(email, password);

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        let user = userCredential.user;
        db.collection("Users")
          .where("email", "==", user.email)
          .get()
          .then((snap) => {
            if (snap.docs[0].exists) {
              // console.log(res.docs[0].data().role);  s
              console.log(snap.docs[0].data());
              dispatch(
                setUser({
                  _id: snap.docs[0].data()._id,
                  email: snap.docs[0].data().email,
                  name: snap.docs[0].data().name,
                  role: snap.docs[0].data().role,
                  verified: user.emailVerified,
                })
              );
              router.push("/admin");
              setLoading(false);
            }
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log("failed to get" + error);
            alert("failed to get");
          });
        // ...
      })
      .catch((error) => {
        let errorMessage = error.message;
        alert(errorMessage);
        setLoading(false);
      });
  };

  return (
    <div>
      {" "}
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
          <form className="space-y-6" action="#" method="POST">
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
                {loading ? "processing.." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
