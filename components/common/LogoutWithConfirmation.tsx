"use client";
import { logout } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Portal from "./Portal";

export function LogoutWithConfirmation() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout(router);
    setIsLoggingOut(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="flex items-center px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-md transition-colors duration-200 w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>

      {isDialogOpen && (
        <Portal>
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] p-4">
            <div
              className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-medium text-white mb-2">
                Confirm Logout
              </h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to logout?
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isLoggingOut}
                  className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors duration-200 disabled:opacity-50 flex items-center"
                >
                  {isLoggingOut && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
