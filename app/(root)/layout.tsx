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
      <div className="flex pt-24 pb-6 gap-1 px-6 max-lg:px-2 ">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1">
          {children}
        </section>
      </div>
    </main>
  );
};

export default Layout;
