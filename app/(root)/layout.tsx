import React from "react";

import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 px-6 py-[20px]">
        <LeftSidebar />
        <section className="grow overflow-y-auto">{children}</section>
      </div>
    </main>
  );
};

export default Layout;
