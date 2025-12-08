import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp, IoLogInOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import { toast } from "react-hot-toast";
import Img from "../assets/logo.png";
import ThemeToggle from "../Theme/ThemeToggle";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, isLoading } = useRole();
  const [open, setOpen] = useState(false);
  const [avatarDropdown, setAvatarDropdown] = useState(false);
  const [showName, setShowName] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-[#5633e4] border-b-2 border-[#8755ea]"
        : "text-gray-700 dark:text-gray-200 hover:text-[#8755ea] hover:scale-105"
    }`;

  const handleSignOut = () => {
    logOut()
      .then(() => toast.success("Sign-out successful"))
      .catch((err) => toast.error(err.message));
    setAvatarDropdown(false);
  };

  // Public Links
  const publicLinks = (
    <>
      <NavLink className={linkClass} to="/">
        Home
      </NavLink>
      <NavLink className={linkClass} to="/joinEmployee">
        Join as Employee
      </NavLink>
      <NavLink className={linkClass} to="/joinHr">
        Join as HR
      </NavLink>
    </>
  );

  // Employee Links
  const employeeLinks = (
    <>
      <NavLink
        to="/myAssets"
        className={(navData) =>
          `px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${linkClass(
            navData
          )}`
        }
      >
        My Assets
      </NavLink>
      <NavLink
        to="/myTeam"
         className={(navData) =>
          `px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${linkClass(
            navData
          )}`
        }
      >
        My Team
      </NavLink>
      <NavLink
        to="/requestAsset"
         className={(navData) =>
          `px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${linkClass(
            navData
          )}`
        }
      >
        Request Asset
      </NavLink>
      <NavLink
        to="/profile"
         className={(navData) =>
          `px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${linkClass(
            navData
          )}`
        }
      >
        Profile
      </NavLink>
    </>
  );

  // HR Links
  const hrLinks = (
    <>
      <NavLink
        to="/assetList"
         className={(navData) =>
          `px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${linkClass(
            navData
          )}`
        }
      >
        Asset List
      </NavLink>
      <NavLink
        to="/addAsset"
         className={(navData) =>
          `px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${linkClass(
            navData
          )}`
        }
      >
        Add Asset
      </NavLink>
      <NavLink
        to="/allRequests"
         className={(navData) =>
          `px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${linkClass(
            navData
          )}`
        }
      >
        All Requests
      </NavLink>
      <NavLink
        to="/profile"
         className={(navData) =>
          `px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${linkClass(
            navData
          )}`
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="/employeeList"
         className={(navData) =>
          `px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${linkClass(
            navData
          )}`
        }
      >
        Employee List
      </NavLink>
    </>
  );

  // Prevent flicker while loading role
  {
    isLoading || !user ? (
      <div className="hidden md:flex items-center gap-6">{publicLinks}</div>
    ) : (
      <div className="hidden md:flex items-center gap-6">
        {role === "employee" && employeeLinks}
        {role === "hr" && hrLinks}
      </div>
    );
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center sm:gap-3 hover:scale-105 transition-transform duration-300 -ml-3"
          >
            <img
              src={Img}
              alt="AssetVerse Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
            />
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white -ml-1">
              Asset<span className="text-orange-500">Verse</span>
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {/* {publicLinks} */}
            {!user && publicLinks}
            {user && role === "employee" && employeeLinks}
            {user && role === "hr" && hrLinks}
          </div>

          {/* Theme + Avatar / Login */}
          <div className="flex items-center gap-2 md:gap-4 relative">
            <ThemeToggle />

            {user ? (
              <div className="relative flex items-center">
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User Avatar"}
                  className="lg:w-10 lg:h-10 w-6 h-6 rounded-full border-2 shadow-md cursor-pointer hover:ring-2 hover:ring-[#5633e4] transition-all duration-300"
                  onMouseEnter={() => setShowName(true)}
                  onMouseLeave={() => setShowName(false)}
                  onClick={() => setAvatarDropdown(!avatarDropdown)}
                />

                {showName && (
                  <div className="absolute left-1/2 -translate-x-1/2 lg:top-[52px] top-[42px] bg-white dark:bg-gray-900 text-xs px-2 py-1 rounded-b shadow-md">
                    {user.displayName || "User"}
                  </div>
                )}

                {avatarDropdown && (
                  <>
                    {role === "hr" && (
                      <div className="absolute lg:-right-5 -right-12 mt-71 w-36 bg-white text-right dark:bg-gray-900 rounded-b-xl shadow-lg flex flex-col z-50 overflow-hidden dark:border-gray-700">
                        {hrLinks}
                        <button
                          onClick={handleSignOut}
                          className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 w-full text-right cursor-pointer hover:text-[#8755ea]"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                    {role === "employee" && (
                      <div className="absolute lg:-right-4 -right-12 mt-62 w-36 bg-white text-right dark:bg-gray-900 rounded-b-xl shadow-lg flex flex-col z-50 overflow-hidden dark:border-gray-700">
                        {employeeLinks}
                        <button
                          onClick={handleSignOut}
                          className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 w-full text-right cursor-pointer hover:text-[#8755ea]"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 backdrop-blur-lg bg-white/10 dark:text-white px-3 py-2 rounded-lg hover:scale-105 transition-transform font-semibold shadow-md"
              >
                <IoLogInOutline /> LogIn
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <IoCloseSharp className="w-5 h-5" />
              ) : (
                <GiHamburgerMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow border-t border-gray-200 dark:border-gray-700 animate-slideDown z-40">
          <div className="px-4 py-4 flex flex-col gap-3">
            {/* {publicLinks} */}
            {!user && publicLinks}
            {user && role === "employee" && employeeLinks}
            {user && role === "hr" && hrLinks}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
