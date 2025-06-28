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
        </>
      </body>
    </html>
  );
}
