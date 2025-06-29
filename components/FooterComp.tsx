const FooterComp = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Abdulwedud. All rights reserved.
        </p>
        <div className="flex gap-3 text-center sm:text-right">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComp;
