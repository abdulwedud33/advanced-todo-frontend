"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LogoImage from "../public/protonlogo.png";

interface user {
  id: string;
  name: string;
  email: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
async function getUser() {
  const res = await fetch(`${baseUrl}/user`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) console.log("Failed to fetch data");
  return res.json();
}

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<user | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required!");
      return;
    }
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) console.log("Failed to add task");
      setTitle("");
      setContent("");
      setError("");
      setIsModalOpen(false);
    } catch (err: any) {
      console.error(err.message);
      setError("Failed to submit. Please try again.");
    }
  };

  const userName = user?.name?.split(" ")[0] || "";

  return (
    <>
      <header className="w-full flex justify-between items-center px-4 py-4 bg-white shadow-md relative z-50">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image src={LogoImage} className="w-10 h-10 mr-2" alt="App Logo" />
          <span className="text-green-800 font-bold text-xl sm:text-2xl">
            Proton
          </span>
        </a>

        {/* Nav for desktop */}
        <nav className="hidden md:flex gap-6 font-bold">
          <Link
            href="/"
            className={
              pathname === "/" ? "text-black" : "text-gray-400 hover:text-black"
            }
          >
            Home
          </Link>
          <Link
            href="/completed"
            className={
              pathname === "/completed"
                ? "text-black"
                : "text-gray-400 hover:text-black"
            }
          >
            Completed
          </Link>
          <Link
            href="/signIn"
            className={
              pathname === "/signIn"
                ? "text-black"
                : "text-gray-400 hover:text-black"
            }
          >
            {userName ? "SignOut" : "SignIn"}
          </Link>
        </nav>

        {/* Right controls: Add & Menu */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* User greeting */}
          <span className="hidden md:flex items-center ml-auto text-gray-600 font-medium text-md w-[140px] truncate">
            <svg
              className="w-6 h-6 text-gray-500 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A6 6 0 0112 15a6 6 0 016.879 2.804M15 11a3 3 0 10-6 0 3 3 0 006 0z"
              />
            </svg>
            Hi, {userName}
          </span>

          {/* Add task button */}
          {pathname === "/" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 px-3 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add
            </button>
          )}

          {/* Menu toggle (mobile only) */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="absolute top-full right-0 left-0 bg-white border-t shadow-md flex flex-col items-center justify-center px-6 py-4 md:hidden">
            <Link
              href="/"
              className="py-2 w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/completed"
              className="py-2 w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Completed
            </Link>
            <Link
              href="/signIn"
              className="py-2 w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              {userName ? "Sign Out" : "Sign In"}
            </Link>
          </div>
        )}
      </header>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/75 flex justify-center items-center z-50">
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-center mb-4">Adding Task</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter your title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <textarea
                placeholder="Enter your content here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border rounded-md px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="bg-green-700 text-white p-3 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Add Task
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="mt-2 bg-gray-600 text-white p-3 rounded-md hover:bg-gray-500 transition flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
