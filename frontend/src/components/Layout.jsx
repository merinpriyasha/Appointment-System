import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#204C41] text-white shadow-md">
        <div className="w-full px-4 md:px-10 py-4 flex justify-between items-center max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold hidden sm:block">SkillSync</h1>
          </div>
          <nav className="space-x-3 text-sm md:text-base">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/appointments" className="hover:underline">
              Appointments
            </Link>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#204C41] text-white py-6 mt-8">
        <div className="w-full px-4 md:px-10 flex flex-col md:flex-row justify-between items-center text-sm max-w-screen-2xl mx-auto">
          <p>© {new Date().getFullYear()} SkillSync. All rights reserved.</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
