import React, { useState } from "react";
import Link from "next/link";
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/userSlice";
import toast from "react-hot-toast";
import { setRegister, unSetRegister } from "@/slices/registeringSlice";
import { createNewSession } from "@/utils/sessions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let dispatch = useDispatch();
  let router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setRegister());

    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      const deviceId = localStorage.getItem("deviceId") || uuidv4();
      localStorage.setItem("deviceId", deviceId);

      // const idToken = await user.getIdToken();

      // const sessionResponse = await fetch("/api/auth/createsession", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${idToken}`,
      //   },
      //   body: JSON.stringify({
      //     deviceId,
      //   }),
      // });

      // const res = await sessionResponse.json();

      // console.log("res", res);
      console.log("trying too create");
      const isCreated = await createNewSession(
        user.uid,
        deviceId,
        navigator.userAgent
      );

      console.log("done creating");
      if (!isCreated) {
        // Session creation failed (probably logged in elsewhere)
        await auth.signOut();
        toast.error("Failed login");
        setLoading(false);
        return;
      }

      console.log("all good");

      const snap = await db
        .collection("Users")
        .where("email", "==", user.email)
        .get();

      if (snap.docs[0].exists) {
        dispatch(
          setUser({
            _id: snap.docs[0].data()._id,
            email: snap.docs[0].data().email,
            name: snap.docs[0].data().name,
            role: snap.docs[0].data().role,
            verified: user.emailVerified,
            expiresOn: snap.docs[0].data().expiresOn,
            phone: snap.docs[0].data().phone,
            activeSubscription: snap.docs[0].data().activeSubscription,
            subscribedBefore: snap.docs[0].data().subscribedBefore,
          })
        );

        // Navigate based on role
        if (snap.docs[0].data().role !== "student") {
          router.push("/admin");
        } else {
          router.push("/learn");
        }
      }
    } catch (error) {
      setLoading(false);
      await auth.signOut();

      // Handle different types of errors
      if (error.response) {
        toast.error("Session error: Already logged in on another device");
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Invalid credentials");
        console.error("Login error:", error);
      }
    }

    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     let user = userCredential.user;
    //     db.collection("Users")
    //       .where("email", "==", user.email)
    //       .get()
    //       .then(async (snap) => {
    //         if (snap.docs[0].exists) {
    //           // let res = await SessionManger.createSession(snap.docs[0].id);
    //           // console.log("res ->", res);
    //           // if (!res) {
    //           //   auth.signOut();
    //           //   toast.error("You are logged in on another device");
    //           //   setLoading(false);
    //           // } else {
    //           dispatch(
    //             setUser({
    //               _id: snap.docs[0].data()._id,
    //               email: snap.docs[0].data().email,
    //               name: snap.docs[0].data().name,
    //               role: snap.docs[0].data().role,
    //               verified: user.emailVerified,
    //               phone: snap.docs[0].data().phone,
    //               activeSubscription: snap.docs[0].data().activeSubscription,
    //               subscribedBefore: snap.docs[0].data().subscribedBefore,
    //             })
    //           );

    //           if (snap.docs[0].data().role !== "student") {
    //             router.push("/admin");
    //           } else {
    //             router.push("/learn");
    //           }
    //           // }
    //         }
    //       })
    //       .catch((error) => {
    //         setLoading(false);
    //         auth.signOut();
    //         toast.error("failed to get");
    //         console.log(error);
    //       });
    //     // ...
    //   })
    //   .catch((error) => {
    //     let errorMessage = JSON.parse(error.message);
    //     setLoading(false);
    //     toast.error(errorMessage.error.message);
    //   });
    dispatch(unSetRegister());
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href="/">
            <img
              className="mx-auto h-20 w-auto transition-transform duration-300 hover:scale-105"
              src="logo.png"
              alt="Sirus Educational Trust"
            />
          </Link>
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-lg shadow-lg">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow duration-200 focus:shadow-md"
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
                    className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={`${showPassword ? "text" : "password"}`}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow duration-200 focus:shadow-md"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      onClick={() => setShowPassword(false)}
                      className="h-5 w-5 text-cyan-500 cursor-pointer hover:text-cyan-600 transition-colors duration-200"
                    >
                      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      onClick={() => setShowPassword(true)}
                      className="h-5 w-5 text-cyan-500 cursor-pointer hover:text-cyan-600 transition-colors duration-200"
                    >
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                disabled={!email || !password || loading}
                className="flex w-full justify-center disabled:opacity-60 rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
              >
                {loading ? "Processing..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
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
