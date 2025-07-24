import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useSelector } from "react-redux";
import { Bell, ChevronDown } from "lucide-react";
import { adminMenu, freelancerMenu, userMenu } from "../data/data.js";


const Layout = ({ children }) => {

  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();


  // close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Spinner while loading user
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#204C41] mb-4"></div>
          <p className="text-gray-700 font-medium">Loading user...</p>
        </div>
      </div>
    );
  }


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Generate menu
  const navBarMenu = user?.isAdmin
    ? adminMenu
    : user?.isFreelancer
      ? freelancerMenu(user._id)
      : userMenu;


  //notification length
  const notifCount = user?.notification?.length || 0;
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
            {/* <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/appointments" className="hover:underline">
              Appointments
            </Link>
            <Link to="/freelancers" className="hover:underline">
              Freelancers
            </Link>
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link> */}
            {navBarMenu.map((menuItem, index) => (
              <Link
                key={index}
                to={menuItem.path}
                className="hover:underline whitespace-nowrap"
              >
                {menuItem.name}
              </Link>
            ))}
          </nav>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            {/* Notification Icon */}
            <div className="relative cursor-pointer" onClick={() => navigate("/notification")}>
              <Bell className="text-white w-6 h-6 hover:text-gray-300" />
              {/* Notification count badge */}
              {notifCount > 0 && (
                <>
                  {/* Ping animation */}
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 animate-ping"></span>

                  {/* Static red dot or count */}
                  <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 text-xs rounded-full bg-red-600 text-white font-semibold">
                    {notifCount}
                  </span>
                </>
              )}
            </div>

            {/* Profile + Dropdown */}
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <img
                  src={user?.image || "/default-avatar.png"}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden sm:inline">{user?.name || "User"}</span>
                <ChevronDown size={16} />
              </div>

              {open && (
                <div className="absolute right-0 top-12 w-40 bg-white text-black rounded-md shadow-lg z-50 py-2">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>


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
