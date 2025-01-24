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
    <div className="mx-auto">
      {" "}
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href="/">
            <img
              className="mx-auto h-16 w-auto"
              src="logo.png"
              alt="Sirus Educational Trust"
            />
          </Link>
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
                // disabled={!email || !password}
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
