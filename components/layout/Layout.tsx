import React from "react";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-[#081028]">
      <div className="nav-with-sidebar">
        <Sidebar />
        <Navbar />
      </div>

      <div className="p-4 md:ml-50 mt-16">{children}</div>
    </main>
  );
};

export default Layout;
