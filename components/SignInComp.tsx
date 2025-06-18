"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SignInComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <>
      <div className="flex flex-col gap-6 justify-center items-center px-4 mt-12">
        <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">SignIn</h2>

          <button
            onClick={() => {
              // Handle Google sign-in logic here
              window.location.href = `${baseUrl}/auth/google`;
            }}
            className="w-full flex items-center justify-center gap-3 hover:cursor-pointer px-2 py-2 mb-4 bg-white border border-gray-300 rounded-xl shadow hover:shadow-md transition text-lg"
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>

          <div className="flex items-center gap-2 mb-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 hover:cursor-pointer rounded-md hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
        </div>

        <button
          onClick={() => {
            // Handle sign-out logic here
            window.location.href = `${baseUrl}/signOut`;
          }}
          className="mt-4 px-4 py-2 bg-red-700 hover:cursor-pointer text-white rounded hover:bg-red-800 transition"
        >
          Sign Out
        </button>
      </div>
      <footer className="absolute bottom-0 w-full bg-gray-800 text-white flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 text-sm p-3">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Abdulwedud. All rights reserved.
        </p>
        <p className="text-center sm:text-right">
          Privacy Policy | Terms of Service
        </p>
      </footer>
    </>
  );
};

export default SignInComp;
