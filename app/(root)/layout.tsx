import React from "react";

import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="background-light_dark relative">
      <Navbar />
      <div className="flex px-6 max-md:px-0">
        <LeftSidebar />
        <section>{children}</section>
      </div>
    </main>
  );
};

export default Layout;
