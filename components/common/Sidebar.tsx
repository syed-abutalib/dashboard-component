"use client";
import React, { useState, useEffect } from "react";
import { LogoutWithConfirmation } from "./LogoutWithConfirmation";
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
import Link from "next/link";
import { authStorage } from "@/lib/hooks/auth";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isOpen && !event.target.closest("#default-sidebar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    {
      link:
        authStorage.getAuth().user?.role === "super_admin"
          ? "/super-admin/dashboard"
          : authStorage.getAuth().user?.role === "admin"
          ? "/admin/dashboard"
          : "/employee/dashboard",
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
    },
    {
      name: "Kanban",
      icon: (
        <svg
          className="shrink-0 w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
        </svg>
      ),
      badge: "Pro",
    },
    {
      name: "Inbox",
      icon: (
        <svg
          className="shrink-0 w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
        </svg>
      ),
      count: 3,
    },
    {
      name: "Users",
      icon: (
        <svg
          className="shrink-0 w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
        </svg>
      ),
    },
    {
      name: "Products",
      icon: (
        <svg
          className="shrink-0 w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
        </svg>
      ),
    },
    {
      name: "Analytics",
      icon: (
        <svg
          className="shrink-0 w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
        </svg>
      ),
    },
    {
      name: "Settings",
      icon: (
        <svg
          className="shrink-0 w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 1 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 1 2.25-3.076Zm-6-9A3.243 3.243 0 0 1 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 1 13.25 5.5Z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed z-40 inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 bg-gray-800/80 backdrop-blur-sm text-white hover:bg-gray-700/80 transition-all duration-300"
        style={{ left: isOpen ? "16rem" : "0.75rem" }}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-r border-white/10 shadow-2xl">
          {/* Logo */}
          <div className="px-3 py-4 mb-2 flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="ms-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sidebar
            </span>
          </div>

          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={`${item.link}`}
                  className={`flex items-center p-3 rounded-lg group transition-all duration-300 transform hover:translate-x-1 ${
                    activeItem === item.name
                      ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 shadow-inner text-white border-l-4 border-purple-400"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  }`}
                  onClick={() => setActiveItem(item.name)}
                >
                  <div
                    className={`transition-all duration-300 ${
                      activeItem === item.name
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {item.name}
                  </span>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center px-2 ms-3 text-xs font-medium text-purple-800 bg-purple-200 rounded-full dark:bg-purple-900 dark:text-purple-200 animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-red-500 rounded-full">
                      {item.count}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* User profile at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-gray-800/50 backdrop-blur-sm">
            <div className="mb-4">
              <LogoutWithConfirmation />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 cursor-pointer mb-3">
                  <div className="flex-shrink-0">
                    <img
                      className="w-10 h-10 rounded-full shadow-lg border-2 border-purple-500/30"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
                      alt="User"
                    />
                  </div>
                  <div className="ms-3">
                    <div className="text-sm font-medium text-white">
                      John Doe
                    </div>
                    <div className="text-xs text-gray-300">Admin</div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <Link
                    href={`/account/profile/${authStorage.getAuth().user?.id}`}
                  >
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Keyboard shortcuts
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Invite users
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>More...</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    New Team
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
