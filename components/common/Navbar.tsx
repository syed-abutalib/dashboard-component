"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Navbar = ({ sidebarWidth = 300 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu items data (optional)
  const menuItems = [
    { name: "Home", isActive: true },
    { name: "Dashboard", isActive: false },
    { name: "Projects", isActive: false },
    { name: "Analytics", isActive: false },
    { name: "Settings", isActive: false },
  ];

  return (
    <nav
      className={`md:fixed top-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/15 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg py-2 rounded-xl mt-4 pt-4 pb-4 mx-6 "
          : "bg-transparent py-4 rounded-xl "
      }`}
      style={{ left: `${sidebarWidth}px` }} // Dynamic sidebar width
    >
      <div className="md:max-w-screen-3xl flex flex-wrap items-center md:justify-between justify-end space-x-4 mx-auto px-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse group"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DashBoard
          </span>
        </a>

        {/* Right side icons */}
        <div className="md:flex items-center space-x-4">
          {/* Search */}
          <button className="p-2 rounded-lg bg-gray-100/60 dark:bg-gray-800/60 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 backdrop-blur-sm transition-all duration-300">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg bg-gray-100/60 dark:bg-gray-800/60 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 backdrop-blur-sm transition-all duration-300 relative">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 21"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM5.54 16a3.48 3.48 0 0 0 4.92 0H5.54Z"
              />
            </svg>
            <span className="absolute top-0 right-0 flex h-4 w-4 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-xs text-white items-center justify-center">
                3
              </span>
            </span>
          </button>

        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
