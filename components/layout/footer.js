"use client";

const Footer = () => {
  return (
    <footer className="w-full py-4 px-6 border-t bg-white mt-auto">
      <div className="container mx-auto text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} QOC UCMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
