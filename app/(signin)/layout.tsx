import type { Metadata } from "next";
import Header from "../../components/headerComp";
import FooterComp from "../../components/FooterComp";
import "../globals.css";

export const metadata: Metadata = {
  title: "Advanced-To-Do-App-SignIn-page",
  description: "Published by Abdulwedud Yassin",
};

export default function SignInLayout({
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
          <FooterComp />
        </>
      </body>
    </html>
  );
}
