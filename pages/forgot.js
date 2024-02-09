import React, { useState } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const [email, setEmail] = useState("zulumkhuzo@gmail.com");
  const [loading, setLoading] = useState(false);
  let router = useRouter();

  const handleForgot = (e) => {
    e.preventDefault();

    setLoading(true);

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Email has been sent");
        router.push("/login");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ..
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
              <button
                onClick={handleForgot}
                disabled={!email || loading}
                className="flex w-full justify-center disabled:opacity-60 rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "processing.." : "Send Reset Link"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
