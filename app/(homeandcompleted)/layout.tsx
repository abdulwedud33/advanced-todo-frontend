import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import Header from "../../components/headerComp";

export const metadata: Metadata = {
  title: "Advanced-To-Do-App",
  description: "Published by Abdulwedud Yassin",
};

export default function HomeAndCompletedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <>
          <Header />
          {children}
          <footer className="absolute bottom-0 w-full bg-gray-800 text-white flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 text-sm p-3">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Abdulwedud. All rights reserved.
            </p>
            <p className="text-center sm:text-right">
              Privacy Policy | Terms of Service
            </p>
          </footer>
        </>
      </body>
    </html>
  );
}
