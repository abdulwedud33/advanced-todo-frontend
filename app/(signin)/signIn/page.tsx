import SignInComp from "@/components/SignInComp";

export default async function SignInPage() {
  return (
    <section className="flex flex-col items-center justify-center">
      <SignInComp />
      <footer className="fixed bottom-0 w-full bg-gray-800 text-white flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 text-sm p-3">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Abdulwedud. All rights reserved.
        </p>
        <p className="text-center sm:text-right">
          Privacy Policy | Terms of Service
        </p>
      </footer>
    </section>
  );
}
