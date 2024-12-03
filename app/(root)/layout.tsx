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
      <div className="flex px-4">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col pb-5 pt-24">
          {children}
        </section>
      </div>
    </main>
  );
};

export default Layout;
