import React from "react";

import Navbar from "@/components/shared/Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
